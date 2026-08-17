export const sectionOrder = [
  "overview",
  "install",
  "update",
  "run",
  "uninstall",
  "usage",
  "ai-integration",
] as const;

export type SectionId = (typeof sectionOrder)[number];
export type PlatformId = "mac" | "windows";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

function assetPath(path: string): string {
  return siteBasePath + path;
}

export type PlatformInstructions = {
  label: string;
  requirements: string[];
  install?: string;
  update?: string;
  run?: string;
  runNote?: string;
  uninstall: string[];
  dataNote: string;
};

export type AIIntegration = {
  type: "local" | "mcp";
  kicker: string;
  title: string;
  intro: string;
  overviewTitle: string;
  overviewBody: string;
  overviewPoints: string[];
  setupTitle: string;
  setupIntro: string;
  setupSteps: string[];
  examples: {
    title: string;
    body: string;
    prompt?: string;
  }[];
  reviewTitle: string;
  reviewSteps: string[];
  boundaryTitle: string;
  boundaryBody: string;
  boundaryPoints: string[];
  resources: {
    label: string;
    href: string;
  }[];
};

export type AppEntry = {
  slug: string;
  name: string;
  shortName: string;
  version: string;
  kicker: string;
  description: string;
  repository: string;
  icon?: string;
  iconKind: "image" | "map";
  platforms: PlatformId[];
  platformSummary: string;
  guide: {
    href: string;
    label: string;
    note: string;
    preview: string;
  };
  additionalGuides?: {
    href: string;
    label: string;
    note: string;
  }[];
  highlights: string[];
  quickStart: string;
  privacy: string;
  usageSteps: {
    title: string;
    body: string;
  }[];
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
  aiIntegration: AIIntegration;
  platformsInfo: Partial<Record<PlatformId, PlatformInstructions>>;
  availabilityNote?: string;
  sourceNote?: string;
};

export const sectionLabels: Record<SectionId, string> = {
  overview: "Overview",
  install: "Install",
  update: "Update",
  run: "Run & rerun",
  uninstall: "Uninstall",
  usage: "Use the app",
  "ai-integration": "AI Integration",
};

export const apps: AppEntry[] = [
  {
    slug: "badge-blur",
    name: "Badge Blur",
    shortName: "Badge Blur",
    version: "0.22.5",
    kicker: "Local badge redaction",
    description:
      "Detect likely identification badges, review every mask, and save redacted copies while keeping originals unchanged.",
    repository: "https://github.com/adammalin/Badge-Blur",
    icon: assetPath("/assets/icons/badge-blur.png"),
    iconKind: "image",
    platforms: ["mac"],
    platformSummary: "Apple silicon · macOS 13+",
    guide: {
      href: assetPath("/assets/guides/Badge-Blur-macOS-Quick-Start.pdf"),
      label: "Badge Blur macOS Quick Start",
      note: "1-page supplied guide · printable PDF",
      preview: assetPath("/assets/guide-previews/badge-blur.png"),
    },
    highlights: [
      "Runs badge detection and image processing locally after setup",
      "Keeps source images read-only and writes unique export folders",
      "Supports review, mask correction, blur adjustment, and run recovery",
    ],
    quickStart:
      "Run the two source-bootstrap commands once. Use the same two commands again for updates and repairs.",
    privacy:
      "Normal detection, review, and export stay on the computer. Setup requires internet access for the verified runtime, dependencies, and local model files.",
    usageSteps: [
      {
        title: "Choose a source folder",
        body: "Select the folder containing the photos. Badge Blur reads the originals and does not replace them.",
      },
      {
        title: "Choose the output format",
        body: "Match each source or choose JPEG, PNG, TIFF, or WebP for the batch.",
      },
      {
        title: "Start and monitor the batch",
        body: "Let the local models detect likely badges. Pause safely when active images need to finish before you stop.",
      },
      {
        title: "Review every photo",
        body: "Use the filmstrip and Before/After view. Add missed masks, remove false masks, and refine mask corners.",
      },
      {
        title: "Save, review, and continue",
        body: "Confirm each image with Save, review & next. Use Save only when you need to persist an edit without advancing.",
      },
      {
        title: "Open the export folder",
        body: "Find redacted copies, metadata archives, the run manifest, and the recovery checkpoint in the unique run folder.",
      },
    ],
    screenshots: [
      {
        src: assetPath("/assets/screenshots/badge-blur-review.png"),
        alt: "Badge Blur review interface showing a synthetic photo and review controls",
        caption: "Inspect the full photo, compare Before and After, then confirm the review.",
      },
      {
        src: assetPath("/assets/screenshots/badge-blur-correct.png"),
        alt: "Badge Blur mask correction interface over a synthetic badge photo",
        caption: "Add a missed mask, adjust its corners or blur, and re-export only that image.",
      },
    ],
    aiIntegration: {
      type: "local",
      kicker: "Local / offline AI",
      title: "Find likely badges without sending photos to a remote model.",
      intro:
        "Badge Blur uses two pinned, quantized vision models on the computer as a first-pass detector. The models propose masks; the reviewer decides what is correct before the final batch is complete.",
      overviewTitle: "How the local detection pipeline works",
      overviewBody:
        "Grounding DINO Tiny searches each image for likely identification badges. Enhanced detection can use CLIP ViT-B/32 to reject common lookalikes such as shirt details, signs, equipment labels, uniform patches, and clipped objects. Both models run through ONNX Runtime WebAssembly in isolated workers so the interface can remain responsive during a batch.",
      overviewPoints: [
        "Setup downloads exact model revisions and verifies their SHA-256 checksums.",
        "Remote model loading is disabled; model, tokenizer, and ONNX runtime files are read locally.",
        "One or two detector workers are selected conservatively from local processor, memory, and benchmark signals.",
        "The AI proposes badge regions only. It does not approve a redaction or replace a source photo.",
      ],
      setupTitle: "What needs internet access—and what does not",
      setupIntro:
        "The first setup or a later update needs internet access to retrieve the application source, runtime, dependencies, and pinned model files. Normal detection, review, correction, recovery, and export then work locally without a model-service connection.",
      setupSteps: [
        "Run the normal Badge Blur setup and allow it to finish downloading and verifying both model packages.",
        "Launch Badge Blur through its checked-in start script so Electron can enforce the local-only runtime policy.",
        "Wait for the local model status to report ready before starting the batch.",
        "Keep source photos in an approved local folder and choose an appropriate local export location.",
      ],
      examples: [
        {
          title: "First-pass detection",
          body: "Let the local detector find likely badge regions across the selected folder while the originals remain read-only.",
        },
        {
          title: "Enhanced filtering",
          body: "Use the enhanced local path when likely shirt details, signs, patches, or equipment labels need a second classification pass.",
        },
        {
          title: "Review-led correction",
          body: "Treat the mask as a starting point: add missed badges, remove false detections, move corners, and adjust blur before confirming the image.",
        },
      ],
      reviewTitle: "Validate every AI-proposed redaction",
      reviewSteps: [
        "Open Review photos and inspect the full image at a useful zoom.",
        "Compare Before and After; look specifically for missed badges and important content hidden by a false mask.",
        "Add or remove masks, move all four mask corners, and adjust blur or mosaic settings when needed.",
        "Choose Save, review & next only after the current image is correct. Export all requires explicit review confirmation for every processed image.",
        "Open a sample of the saved files from the run folder and confirm the final pixels match the reviewed view.",
      ],
      boundaryTitle: "Why offline processing matters",
      boundaryBody:
        "Photos that contain identification badges can also contain people, facilities, screens, equipment, or other sensitive context. Keeping inference and image processing on the workstation reduces unnecessary transfer, but it does not make every photo approved for use.",
      boundaryPoints: [
        "The Electron app permits normal network reads only to its private loopback service and blocks remote model loading.",
        "Source images are not overwritten or copied into the export folder; only redacted outputs and local recovery records are written.",
        "Reviewed corrections are saved as local annotations and do not retrain or silently change the bundled models.",
        "Detection can miss a badge or flag the wrong object. Human review remains required, and local handling rules still apply.",
      ],
      resources: [
        {
          label: "Badge Blur model and security notes",
          href: "https://github.com/adammalin/Badge-Blur#model-download",
        },
      ],
    },
    platformsInfo: {
      mac: {
        label: "macOS",
        requirements: [
          "Apple silicon Mac",
          "macOS 13 or later",
          "Internet access during first setup",
          "Run as your normal user; no administrator access is requested",
        ],
        install:
          '/usr/bin/curl --fail --location --show-error \\\n  https://raw.githubusercontent.com/adammalin/Badge-Blur/main/scripts/bootstrap-mac-source-test.zsh \\\n  --output "$HOME/Downloads/badge-blur-install.zsh"\n\n/bin/zsh "$HOME/Downloads/badge-blur-install.zsh" \\\n  "$HOME/Badge-Blur-source-test"',
        update:
          '/usr/bin/curl --fail --location --show-error \\\n  https://raw.githubusercontent.com/adammalin/Badge-Blur/main/scripts/bootstrap-mac-source-test.zsh \\\n  --output "$HOME/Downloads/badge-blur-install.zsh"\n\n/bin/zsh "$HOME/Downloads/badge-blur-install.zsh" \\\n  "$HOME/Badge-Blur-source-test"',
        run:
          'cd "$HOME/Badge-Blur-source-test"\n/bin/zsh scripts/start-mac-source-test.zsh',
        runNote:
          "Close the window or press Command-Q to stop Badge Blur and its private local service.",
        uninstall: [
          "Quit Badge Blur and wait for its window to close.",
          "In Finder, open your home folder and move Badge-Blur-source-test to the Trash.",
          "Empty the Trash only after confirming you no longer need the private runtime and downloaded model files inside that folder.",
        ],
        dataNote:
          "Export folders live beside the source photos and are intentionally preserved. Removing the source-test folder does not delete those exports.",
      },
    },
    availabilityNote:
      "The repository currently documents this source-script route for Apple-silicon macOS. A Windows source-bootstrap workflow is not supplied, so this library does not point teammates to the unsigned Windows installer.",
  },
  {
    slug: "orgchart-studio",
    name: "ORNL OrgChart Studio",
    shortName: "OrgChart Studio",
    version: "0.1.0",
    kicker: "Governed organization charts",
    description:
      "Create, review, version, back up, and export structured organization charts in a local Electron workspace.",
    repository: "https://github.com/adammalin/Org-Chart-Studio",
    icon: assetPath("/assets/icons/orgchart-studio-topbar.svg"),
    iconKind: "image",
    platforms: ["mac", "windows"],
    platformSummary: "macOS 13+ · Windows 10/11",
    guide: {
      href: assetPath("/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start.pdf"),
      label: "OrgChart Studio macOS Quick Start",
      note: "2-page supplied guide · August 4, 2026",
      preview: assetPath("/assets/guide-previews/orgchart-studio.png"),
    },
    additionalGuides: [
      {
        href: assetPath("/assets/guides/ORNL-OrgChart-Studio-Desktop-Quick-Start.pdf"),
        label: "Current Mac & Windows Quick Start",
        note: "3-page repository guide · August 6, 2026",
      },
    ],
    highlights: [
      "Separates the downloaded application from the working chart library",
      "Supports reviewed imports, named versions, exports, and independent backups",
      "Can expose optional local AI tools with chart scoping and human review",
    ],
    quickStart:
      "The public bootstrap installs into a normal user folder, records the source revision, builds the app, and runs a desktop smoke check.",
    privacy:
      "Working chart data stays outside the application folder in Application Support or AppData by default. Use only content approved for the connected AI environment.",
    usageSteps: [
      {
        title: "Create or import a draft",
        body: "Start a blank chart or validate reviewed CSV, Excel, or JSON data in Sources & imports.",
      },
      {
        title: "Build the hierarchy",
        body: "Add units, set reporting lines, arrange cards, and choose separate routes or sibling combs for connectors.",
      },
      {
        title: "Review structure and sources",
        body: "Resolve blocking findings, check source certainty, and use the accessible table or review queue as needed.",
      },
      {
        title: "Save named versions",
        body: "Autosave protects the working draft; named versions create immutable comparison and recovery points.",
      },
      {
        title: "Back up independently",
        body: "Choose all or selected charts, choose encrypted or explicitly readable protection, and use Run backup now.",
      },
      {
        title: "Publish an output",
        body: "Export SVG, PNG, vector PDF, accessible CSV, or editable PowerPoint from the same chart data.",
      },
    ],
    screenshots: [
      {
        src: assetPath("/assets/screenshots/orgchart-studio-editor.png"),
        alt: "OrgChart Studio interface containing a synthetic example organization with vacant positions",
        caption:
          "Synthetic preview: edit a structured hierarchy, inspect save state, and move between governance workspaces.",
      },
    ],
    aiIntegration: {
      type: "mcp",
      kicker: "AI integration / MCP server",
      title: "Let a desktop AI prepare chart changes for human review.",
      intro:
        "OrgChart Studio includes an optional local Model Context Protocol companion. It gives ChatGPT desktop or Codex a bounded set of chart tools while the app remains the review and approval surface.",
      overviewTitle: "What the MCP server does",
      overviewBody:
        "Model Context Protocol, or MCP, is an open standard that lets an AI client discover named tools with structured inputs. OrgChart Studio's on-demand STDIO server connects only to the running Electron app through a loopback address and a new private token for each launch.",
      overviewPoints: [
        "Read tools can list charts, read an allowed chart, inspect versions, and run validation without changing data.",
        "Write tools can stage a reviewed import or a proposed change to an existing working draft.",
        "The app exposes pause, chart-scope, retained-source permission, and session-receipt controls.",
        "No MCP tool can delete charts, restore backups, retrieve backup passphrases, change storage locations, or publish an output.",
      ],
      setupTitle: "Connect ChatGPT desktop or Codex",
      setupIntro:
        "The macOS and Windows setup scripts can register the local server in the shared desktop MCP configuration. The ChatGPT desktop app, Codex app, Codex CLI, and Codex IDE extension can use that local configuration; an ordinary ChatGPT web chat cannot reach this private desktop bridge.",
      setupSteps: [
        "During setup, type y at Install the local MCP integration? [y/N]. If the app is already installed, open AI & MCP control and choose Install local AI integration.",
        "Restart ChatGPT desktop or Codex once after registration.",
        "Open OrgChart Studio before asking the AI to use a chart tool.",
        "In AI & MCP control, resume MCP only for the intended session and allow all charts or select only the approved chart IDs.",
        "Leave retained-source extraction off unless the files and the selected AI environment are approved for one another.",
        "Type /mcp in ChatGPT desktop or Codex and confirm orgchart_studio is enabled.",
      ],
      examples: [
        {
          title: "Start with a read-only inventory",
          body: "Resolve the stable chart ID before requesting any change.",
          prompt:
            "Use orgchart_studio to list available charts. Return titles and stable chart IDs only. Do not read full chart contents and do not change anything.",
        },
        {
          title: "Validate an approved chart",
          body: "Ask for findings before asking the AI to prepare a fix.",
          prompt:
            "Read only chart [CHART ID], run its validation, and summarize blocking and advisory findings. Do not stage, apply, save, or publish changes.",
        },
        {
          title: "Stage one bounded change",
          body: "Name the invariant fields so the proposal stays narrow.",
          prompt:
            "For chart [CHART ID], change only [EXACT FIELD AND VALUE]. Preserve chart identity, card IDs, reporting relationships, layout, connector pins, source fields, and all other content. Stage the result with replace_chart_draft for review. Do not apply or save it.",
        },
      ],
      reviewTitle: "Validate the proposal inside OrgChart Studio",
      reviewSteps: [
        "Confirm the app shows AI preparing changes and names the expected operation.",
        "Choose Review changes. Inspect the read-only proposed canvas and every Before and After field.",
        "Check added or changed cards, reporting connectors, layout, pins, current/planned state, source certainty, locators, and review notes.",
        "Choose Reject proposal if anything is broader or less certain than requested. The saved chart remains unchanged.",
        "If the proposal is correct, choose Apply reviewed changes, run validation again, and resolve any Source review queue items.",
        "Save a named version to create an immutable checkpoint and link the accepted AI-assisted activity record to it.",
      ],
      boundaryTitle: "Keep chart access deliberate",
      boundaryBody:
        "Local transport does not mean chart data stays out of the AI conversation. Any chart fields or extracted source content returned by an allowed read tool are shared with the selected AI client.",
      boundaryPoints: [
        "Use only charts and retained sources approved for the selected ChatGPT or Codex environment.",
        "Prefer Selected charts over All charts for routine work, and pause MCP when the session ends.",
        "Retained-source extraction is separately controlled, off by default, and resets off when the app restarts.",
        "Ask the AI to stage proposals only. Apply, version, export, and backup remain explicit human actions in the app.",
      ],
      resources: [
        {
          label: "OrgChart Studio Codex handoff",
          href: "https://github.com/adammalin/Org-Chart-Studio/blob/main/docs/CODEX-HANDOFF.md",
        },
        {
          label: "OpenAI Model Context Protocol guide",
          href: "https://learn.chatgpt.com/docs/extend/mcp",
        },
      ],
    },
    platformsInfo: {
      mac: {
        label: "macOS",
        requirements: [
          "macOS 13 or later",
          "Internet access during setup",
          "Public GitHub access",
          "Run as your normal user; no administrator access is needed",
        ],
        install:
          '/usr/bin/curl --fail --location --show-error \\\n  --output "$HOME/Downloads/orgchart-studio-install.zsh" \\\n  "https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-mac-source-test.zsh"\n\n/bin/zsh "$HOME/Downloads/orgchart-studio-install.zsh" \\\n  "$HOME/OrgChart-Studio-source-test"',
        update:
          '/usr/bin/curl --fail --location --show-error \\\n  --output "$HOME/Downloads/orgchart-studio-install.zsh" \\\n  "https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-mac-source-test.zsh"\n\n/bin/zsh "$HOME/Downloads/orgchart-studio-install.zsh" \\\n  "$HOME/OrgChart-Studio-source-test"',
        run:
          '/bin/zsh "$HOME/OrgChart-Studio-source-test/scripts/start-mac-source-test.zsh"',
        runNote:
          "You can also double-click Start-OrgChart-Studio.command in the source-test folder. Use the red X or Command-Q to stop the interface and private service.",
        uninstall: [
          "Create and verify a current backup before removing the app.",
          "If you installed the local AI connection, remove it in Local AI control before deleting the application folder.",
          "Quit OrgChart Studio with the red X or Command-Q.",
          "In Finder, move OrgChart-Studio-source-test from your home folder to the Trash.",
        ],
        dataNote:
          "The chart library remains in ~/Library/Application Support/ORNL OrgChart Studio or the separate live-data folder you chose. Backups also remain. Delete those only when you intentionally want to remove chart data and have verified the correct backup.",
      },
      windows: {
        label: "Windows",
        requirements: [
          "Windows 10 or 11",
          "Internet access during setup",
          "Public GitHub access",
          "Use a normal, non-administrator PowerShell window",
        ],
        install:
          'Invoke-WebRequest -UseBasicParsing \u0060\n  -Uri "https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-windows-source-test.ps1" \u0060\n  -OutFile "$env:TEMP\\orgchart-studio-install.ps1"\n\npowershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass \u0060\n  -File "$env:TEMP\\orgchart-studio-install.ps1" \u0060\n  -TargetDirectory "$env:USERPROFILE\\OrgChart-Studio-source-test"',
        update:
          'Invoke-WebRequest -UseBasicParsing \u0060\n  -Uri "https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-windows-source-test.ps1" \u0060\n  -OutFile "$env:TEMP\\orgchart-studio-install.ps1"\n\npowershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass \u0060\n  -File "$env:TEMP\\orgchart-studio-install.ps1" \u0060\n  -TargetDirectory "$env:USERPROFILE\\OrgChart-Studio-source-test"',
        run:
          'powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "$env:USERPROFILE\\OrgChart-Studio-source-test\\scripts\\start-windows-source-test.ps1"',
        runNote:
          "You can also double-click Start-OrgChart-Studio.cmd in the source-test folder. Use the red X to stop the interface and private service.",
        uninstall: [
          "Create and verify a current backup before removing the app.",
          "If you installed the local AI connection, remove it in Local AI control before deleting the application folder.",
          "Quit OrgChart Studio with the red X.",
          "In File Explorer, move OrgChart-Studio-source-test from your user folder to the Recycle Bin.",
        ],
        dataNote:
          "The chart library remains in your Windows application-data folder or the separate live-data folder you chose. Backups remain where you saved them. Remove those only when chart-data deletion is intentional and verified.",
      },
    },
    sourceNote:
      "The supplied August 4 macOS PDF is preserved unchanged. These web instructions and the additional cross-platform PDF follow the newer August 6 repository scripts and backup behavior.",
  },
  {
    slug: "usa-map-studio",
    name: "USA Map Studio",
    shortName: "USA Map Studio",
    version: "0.8.0",
    kicker: "Accurate local map editing",
    description:
      "Build data-driven maps of the United States with offline Census geography, editable projects, named layers, and export tools.",
    repository: "https://github.com/adammalin/Map-Maker-Studio",
    iconKind: "map",
    platforms: ["mac", "windows"],
    platformSummary: "macOS 12+ · Windows 10/11",
    guide: {
      href: assetPath("/assets/guides/USA-Map-Studio-User-Guide-v0.8.0.pdf"),
      label: "USA Map Studio User Guide",
      note: "6-page v0.8.0 guide · installation, labels, recovery, and export",
      preview: assetPath("/assets/guide-previews/usa-map-studio.png"),
    },
    highlights: [
      "Uses bundled 2025 Census geometry and place coordinates offline",
      "Builds named layers with unique visible-city counts, multi-row callouts, and embedded custom SVG pins",
      "Autosaves complete .usmap.json projects with recovery history, export preflight, and editable PowerPoint output",
    ],
    quickStart:
      "Clone the public repository, run the platform setup script, and use the checked-in Start file for later launches.",
    privacy:
      "Normal editing, place lookup, rendering, and export are local. Project and CSV content are written only where the user chooses.",
    usageSteps: [
      {
        title: "Start a project",
        body: "Open the Map editor, set the visible canvas, and save a .usmap.json path early. Autosave and rotating recovery points protect later changes.",
      },
      {
        title: "Bring in locations",
        body: "Add pins one at a time or import CSV rows with city, state, optional coordinates, Company, and additional label columns.",
      },
      {
        title: "Organize layers",
        body: "Name, reorder, show, and hide independent location groups. Legends report each layer's unique visible-city count and pin design.",
      },
      {
        title: "Style the map",
        body: "Control state fills, boundaries, county lines, label typography, callout leaders, halo, legend, custom SVG pins, and ORNL draft swatches.",
      },
      {
        title: "Navigate precisely",
        body: "Hold Space and drag to pan, scroll to zoom, drag pins or callouts, arrange labels, and use 0 for Fit or 1 for 100%.",
      },
      {
        title: "Export the visible composition",
        body: "Review export preflight, then create SVG, 2400 × 1440 PNG, or editable PowerPoint with the active layers, labels, legend, pin size, zoom, and pan.",
      },
    ],
    screenshots: [
      {
        src: assetPath("/assets/screenshots/usa-map-studio-overview.png"),
        alt: "USA Map Studio interface showing the locations workspace and a map with sample cities",
        caption:
          "The Locations workspace combines searchable rows, the live map, layer-aware controls, and a selected-pin inspector.",
      },
    ],
    aiIntegration: {
      type: "mcp",
      kicker: "AI integration / MCP server",
      title: "Turn a map request into a visible, reviewable proposal.",
      intro:
        "USA Map Studio includes a local Model Context Protocol server for ChatGPT desktop, Codex, and other compatible desktop clients. The AI can inspect the open project and stage one change; a person decides whether it reaches the working map.",
      overviewTitle: "What the MCP server does",
      overviewBody:
        "Model Context Protocol, or MCP, is an open standard for presenting app functions as structured AI tools. USA Map Studio's on-demand STDIO server connects to the open Electron app through a loopback-only bridge, an ephemeral port, and a new private token for every launch.",
      overviewPoints: [
        "Read tools report app status, the current project, layers, locations, and validation results.",
        "Stage tools prepare layer, location, CSV, pin, visibility, and map-style changes without applying them.",
        "Every write creates one visible proposal and checks the project's exact updatedAt value to prevent stale changes.",
        "Removing a layer, removing locations, and replacing a project are flagged as destructive even though they still stop at human review.",
      ],
      setupTitle: "Connect ChatGPT desktop or Codex",
      setupIntro:
        "The normal macOS and Windows setup registers usa_map_studio automatically unless that optional step was skipped. The ChatGPT desktop app, Codex app, Codex CLI, and Codex IDE extension can use the local server; an ordinary ChatGPT web chat cannot reach the private desktop bridge.",
      setupSteps: [
        "Complete the normal USA Map Studio setup. If you previously skipped MCP registration, rerun the normal setup without the skip option so it can register the connection.",
        "Restart ChatGPT desktop or Codex after the configuration changes.",
        "Open USA Map Studio and open or create the project you intend to change.",
        "Type /mcp in ChatGPT desktop or Codex and confirm usa_map_studio is enabled.",
        "Ask the AI to call get_app_status first, then read only the project, layers, or locations needed for the request.",
      ],
      examples: [
        {
          title: "Inspect the open map first",
          body: "Establish the project ID, update timestamp, and stable layer IDs before staging a change.",
          prompt:
            "Use usa_map_studio to check app status and summarize the current project and layer IDs. Do not change, stage, apply, save, or export anything.",
        },
        {
          title: "Stage locations from CSV",
          body: "Target one stable layer ID and ask for unresolved rows explicitly.",
          prompt:
            "Read the current project, then stage these cleared CSV locations into layer [LAYER ID] using add mode and the app's offline place lookup. Report every unresolved row. Do not apply or save the proposal.",
        },
        {
          title: "Stage a narrow style change",
          body: "State which map properties must remain unchanged.",
          prompt:
            "Stage only this map-style change: [EXACT CHANGE]. Preserve every layer, location, coordinate, label, pin override, custom SVG, pan, zoom, and all unspecified style values. Do not apply, save, or export it.",
        },
      ],
      reviewTitle: "Validate the proposal inside USA Map Studio",
      reviewSteps: [
        "Open Local AI control or the proposal banner and confirm the operation matches the request.",
        "Compare Before and After. Verify the project ID, target layer ID, location counts, unresolved CSV rows, coordinates, visibility, labels, pins, and style values.",
        "Inspect the live map for misplaced pins, unexpected layer changes, label collisions, and altered pan or zoom.",
        "Choose Reject proposal if anything is wrong or broader than requested; the project remains unchanged.",
        "If correct, choose Apply to working map, inspect the canvas again, and watch the autosave status. Undo remains available.",
        "Export a proof when the output matters and inspect the SVG, PNG, or PowerPoint separately from the working-map review.",
      ],
      boundaryTitle: "Know when map data enters the AI conversation",
      boundaryBody:
        "Normal map editing, offline place lookup, rendering, and export remain local. Project or CSV-derived content becomes part of the AI conversation only when an MCP read tool returns it or when the user supplies it in a prompt.",
      boundaryPoints: [
        "Use the integration only with project and CSV content approved for the selected AI environment.",
        "The runtime token exists only while USA Map Studio is open and should never be copied into a permanent configuration file.",
        "Stable project and layer IDs plus the exact updatedAt value protect against changing the wrong or stale project.",
        "The AI stages; the person reviews, applies or rejects, verifies autosave, and decides whether to export.",
      ],
      resources: [
        {
          label: "USA Map Studio MCP guide",
          href: "https://github.com/adammalin/Map-Maker-Studio/blob/main/docs/MCP.md",
        },
        {
          label: "OpenAI Model Context Protocol guide",
          href: "https://learn.chatgpt.com/docs/extend/mcp",
        },
      ],
    },
    platformsInfo: {
      mac: {
        label: "macOS",
        requirements: [
          "macOS 12 or later",
          "Git",
          "Internet access during first setup",
          "Run Terminal as your normal user",
        ],
        install:
          'git clone https://github.com/adammalin/Map-Maker-Studio.git \\\n  "$HOME/Map-Maker-Studio"\ncd "$HOME/Map-Maker-Studio"\n/bin/zsh scripts/setup-macos.zsh',
        update:
          'cd "$HOME/Map-Maker-Studio"\n/bin/zsh scripts/setup-macos.zsh',
        run:
          '/bin/zsh "$HOME/Map-Maker-Studio/Start-USA-Map-Studio.command"',
        runNote:
          "You can also double-click Start-USA-Map-Studio.command in the cloned folder.",
        uninstall: [
          "Save any project you want to keep as a .usmap.json file.",
          "If the optional local AI connection is installed, double-click Remove-USA-Map-Studio-MCP.command or run /bin/zsh \"$HOME/Map-Maker-Studio/Remove-USA-Map-Studio-MCP.command\" before deleting the folder.",
          "Quit USA Map Studio.",
          "In Finder, move Map-Maker-Studio from your home folder to the Trash.",
        ],
        dataNote:
          "Saved .usmap.json projects and exports remain wherever you placed them. The app's internal recovery data may remain under ~/Library/Application Support/USA Map Studio.",
      },
      windows: {
        label: "Windows",
        requirements: [
          "Windows 10 or 11",
          "Git",
          "Internet access during first setup",
          "Use a normal, non-administrator PowerShell window",
        ],
        install:
          'git clone https://github.com/adammalin/Map-Maker-Studio.git \u0060\n  "$env:USERPROFILE\\Map-Maker-Studio"\nSet-Location "$env:USERPROFILE\\Map-Maker-Studio"\npowershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass \u0060\n  -File ".\\scripts\\setup-windows.ps1"',
        update:
          'Set-Location "$env:USERPROFILE\\Map-Maker-Studio"\npowershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass \u0060\n  -File ".\\scripts\\setup-windows.ps1"',
        run:
          '& "$env:USERPROFILE\\Map-Maker-Studio\\Start-USA-Map-Studio.cmd"',
        runNote:
          "You can also double-click Start-USA-Map-Studio.cmd in the cloned folder.",
        uninstall: [
          "Save any project you want to keep as a .usmap.json file.",
          "If the optional local AI connection is installed, double-click Remove-USA-Map-Studio-MCP.cmd or run & \"$env:USERPROFILE\\Map-Maker-Studio\\Remove-USA-Map-Studio-MCP.cmd\" before deleting the folder.",
          "Quit USA Map Studio.",
          "In File Explorer, move Map-Maker-Studio from your user folder to the Recycle Bin.",
        ],
        dataNote:
          "Saved .usmap.json projects and exports remain wherever you placed them. Internal recovery data may remain in the USA Map Studio application-data folder.",
      },
    },
  },
];

export const appsBySlug = Object.fromEntries(
  apps.map((app) => [app.slug, app]),
) as Record<string, AppEntry>;

export function isSectionId(value: string): value is SectionId {
  return sectionOrder.includes(value as SectionId);
}
