export const sectionOrder = [
  "overview",
  "install",
  "update",
  "run",
  "uninstall",
  "usage",
] as const;

export type SectionId = (typeof sectionOrder)[number];
export type PlatformId = "mac" | "windows";

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
    icon: "/assets/icons/badge-blur.png",
    iconKind: "image",
    platforms: ["mac"],
    platformSummary: "Apple silicon · macOS 13+",
    guide: {
      href: "/assets/guides/Badge-Blur-macOS-Quick-Start.pdf",
      label: "Badge Blur macOS Quick Start",
      note: "1-page supplied guide · printable PDF",
      preview: "/assets/guide-previews/badge-blur.png",
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
        src: "/assets/screenshots/badge-blur-review.png",
        alt: "Badge Blur review interface showing a synthetic photo and review controls",
        caption: "Inspect the full photo, compare Before and After, then confirm the review.",
      },
      {
        src: "/assets/screenshots/badge-blur-correct.png",
        alt: "Badge Blur mask correction interface over a synthetic badge photo",
        caption: "Add a missed mask, adjust its corners or blur, and re-export only that image.",
      },
    ],
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
    icon: "/assets/icons/orgchart-studio-topbar.svg",
    iconKind: "image",
    platforms: ["mac", "windows"],
    platformSummary: "macOS 13+ · Windows 10/11",
    guide: {
      href: "/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start.pdf",
      label: "OrgChart Studio macOS Quick Start",
      note: "2-page supplied guide · August 4, 2026",
      preview: "/assets/guide-previews/orgchart-studio.png",
    },
    additionalGuides: [
      {
        href: "/assets/guides/ORNL-OrgChart-Studio-Desktop-Quick-Start.pdf",
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
        src: "/assets/screenshots/orgchart-studio-editor.png",
        alt: "OrgChart Studio interface containing a synthetic example organization with vacant positions",
        caption:
          "Synthetic preview: edit a structured hierarchy, inspect save state, and move between governance workspaces.",
      },
    ],
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
    version: "0.5.1",
    kicker: "Accurate local map editing",
    description:
      "Build data-driven maps of the United States with offline Census geography, editable projects, named layers, and export tools.",
    repository: "https://github.com/adammalin/Map-Maker-Studio",
    iconKind: "map",
    platforms: ["mac", "windows"],
    platformSummary: "macOS 12+ · Windows 10/11",
    guide: {
      href: "/assets/guides/USA-Map-Studio-User-Guide.pdf",
      label: "USA Map Studio User Guide",
      note: "6-page supplied guide · installation and usage",
      preview: "/assets/guide-previews/usa-map-studio.png",
    },
    highlights: [
      "Uses bundled 2025 Census geometry and place coordinates offline",
      "Imports CSV data into named layers and saves complete .usmap.json projects",
      "Exports SVG, PNG, and editable one-slide PowerPoint compositions",
    ],
    quickStart:
      "Clone the public repository, run the platform setup script, and use the checked-in Start file for later launches.",
    privacy:
      "Normal editing, place lookup, rendering, and export are local. Project and CSV content are written only where the user chooses.",
    usageSteps: [
      {
        title: "Start a project",
        body: "Open the Map editor, set the visible canvas, and save a .usmap.json project path early.",
      },
      {
        title: "Bring in locations",
        body: "Add pins one at a time or import CSV rows with city and state, plus optional coordinates and visual fields.",
      },
      {
        title: "Organize layers",
        body: "Name, reorder, show, hide, and count independent location groups. Apply shared pin styling or one-off exceptions.",
      },
      {
        title: "Style the map",
        body: "Control state fills, boundaries, county lines, labels, halo, legend, custom SVG pins, and ORNL draft swatches.",
      },
      {
        title: "Navigate precisely",
        body: "Hold Space and drag to pan, scroll to zoom, drag pins to refine coordinates, and use 0 for Fit or 1 for 100%.",
      },
      {
        title: "Export the visible composition",
        body: "Export SVG, 2400 × 1440 PNG, or editable PowerPoint using the current layers, pin size, zoom, and pan.",
      },
    ],
    screenshots: [
      {
        src: "/assets/screenshots/usa-map-studio-overview.png",
        alt: "USA Map Studio interface showing the locations workspace and a map with sample cities",
        caption:
          "The Locations workspace combines searchable rows, the live map, layer-aware controls, and a selected-pin inspector.",
      },
    ],
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
          "If the optional local AI connection is installed, run npm run mcp:remove from the Map-Maker-Studio folder before deleting it.",
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
          "If the optional local AI connection is installed, run npm run mcp:remove from the Map-Maker-Studio folder before deleting it.",
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
