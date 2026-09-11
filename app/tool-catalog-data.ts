import { apps } from "./app-data";
import { ercpProposalFiguresPlugin } from "./ercp-proposal-figures-data";
import { presentationPlugin } from "./presentation-plugin-data";
import { threeDModelingAgentPlugin } from "./three-d-modeling-agent-data";

export const toolCategoryOrder = [
  "desktop-app",
  "web-app",
  "custom-gpt",
  "codex-plugin",
] as const;

export type ToolCategory = (typeof toolCategoryOrder)[number];

export type ToolAction = {
  label: string;
  href: string;
  external?: boolean;
  kind?: "primary" | "secondary";
};

export type ToolVersion = {
  version: string;
  label: string;
  href: string;
  current: boolean;
};

export type ToolCatalogEntry = {
  slug: string;
  name: string;
  category: ToolCategory;
  kicker: string;
  description: string;
  versionLabel: string;
  tags: string[];
  actions: ToolAction[];
  icon?: string;
  iconKind?: "image" | "map";
  versions?: ToolVersion[];
};

const desktopTools: ToolCatalogEntry[] = apps.map((app) => ({
  slug: app.slug,
  name: app.name,
  category: "desktop-app",
  kicker: app.kicker,
  description: app.description,
  versionLabel: `v${app.version} · ${app.platformSummary}`,
  tags: [
    ...app.platforms.map((platform) => (platform === "mac" ? "macOS" : "Windows")),
    app.aiIntegration.type === "local" ? "Local AI" : "MCP integration",
    "Desktop app",
  ],
  actions: [
    {
      label: "Open app guide",
      href: `/apps/${app.slug}`,
      kind: "primary",
    },
    {
      label: "Open PDF guide",
      href: app.guide.href,
      external: true,
      kind: "secondary",
    },
  ],
  icon: app.icon,
  iconKind: app.iconKind,
}));

const webTools: ToolCatalogEntry[] = [
  {
    slug: "qr-studio",
    name: "QR Studio",
    category: "web-app",
    kicker: "Browser-based QR generator",
    description:
      "Create QR codes for websites, text, email, phone, SMS, Wi-Fi, contacts, and locations. Adjust dots or pixels, colors, output size, error correction, and a fully transparent background, then export PNG or SVG.",
    versionLabel: "Live web app",
    tags: ["QR code", "PNG", "SVG", "Transparent background", "Color", "Mobile"],
    actions: [
      {
        label: "Open QR Studio",
        href: "https://adammalin.github.io/QR-code-gen/",
        external: true,
        kind: "primary",
      },
    ],
  },
];

const customGpts: ToolCatalogEntry[] = [
  {
    slug: "ornl-brand-agent",
    name: "ORNL Brand Agent",
    category: "custom-gpt",
    kicker: "Custom GPT · Visual design guidance",
    description:
      "Use the preferred ORNL Brand Agent for current work, with the previous version kept available when an older workflow is needed.",
    versionLabel: "Preferred · v2.3.2",
    tags: ["ORNL brand", "Visual design", "Custom GPT", "Version history"],
    actions: [
      {
        label: "Open preferred version",
        href: "https://chatgpt.com/g/g-6a57d24b2aa48191a15d3be17f6d8651-ornl-brand-agent-v2-3-2",
        external: true,
        kind: "primary",
      },
    ],
    versions: [
      {
        version: "v2.3.2",
        label: "Preferred version",
        href: "https://chatgpt.com/g/g-6a57d24b2aa48191a15d3be17f6d8651-ornl-brand-agent-v2-3-2",
        current: true,
      },
      {
        version: "v1",
        label: "Previous version",
        href: "https://chatgpt.com/g/g-69f267456cc08191876ba6ffdacb7e40-ornl-brand-visual-design-agent",
        current: false,
      },
    ],
  },
];

const codexPlugins: ToolCatalogEntry[] = [
  {
    slug: "ornl-presentation-designer",
    name: presentationPlugin.name,
    category: "codex-plugin",
    kicker: "Agent Plugin · PowerPoint",
    description:
      "Create new editable ORNL decks or confidently redesign existing presentations with source, brand, preservation, and native-review gates.",
    versionLabel: `v${presentationPlugin.version}`,
    tags: ["PowerPoint", "ORNL brand", "Presentations", "Editable decks"],
    actions: [
      {
        label: "Open complete guide",
        href: "/resources/ornl-presentation-designer",
        kind: "primary",
      },
      {
        label: "Download details",
        href: "/resources/ornl-presentation-designer#download",
        kind: "secondary",
      },
    ],
  },
  {
    slug: "doe-proposal-figure-1",
    name: ercpProposalFiguresPlugin.name,
    category: "codex-plugin",
    kicker: "Beta · Agent Plugin · Scientific figures",
    description:
      "Turn a substantive ERCP or ECRP proposal into a source-grounded, completely label-free raster Figure 1 collaboration draft with repeatable quality gates.",
    versionLabel: `v${ercpProposalFiguresPlugin.version}`,
    tags: ["DOE proposals", "Scientific figures", "Image generation", "ERCP", "ECRP"],
    actions: [
      {
        label: "Open beta guide",
        href: "/resources/ercp-proposal-figures",
        kind: "primary",
      },
      {
        label: "Download details",
        href: "/resources/ercp-proposal-figures#download",
        kind: "secondary",
      },
    ],
  },
  {
    slug: "3d-modeling-agent",
    name: threeDModelingAgentPlugin.name,
    category: "codex-plugin",
    kicker: "Beta · Agent Plugin · 3D production",
    description:
      "Plan, build, audit, validate, and package editable 3D assets with route-aware workflows for procedural, CAD, generative, reconstruction, and hybrid production.",
    versionLabel: `v${threeDModelingAgentPlugin.version}`,
    tags: ["3D modeling", "Blender", "Cinema 4D", "CAD", "Asset validation"],
    actions: [
      {
        label: "Open beta guide",
        href: "/resources/3d-modeling-agent",
        kind: "primary",
      },
      {
        label: "Download details",
        href: "/resources/3d-modeling-agent#download",
        kind: "secondary",
      },
    ],
  },
];

export const toolCatalogEntries: ToolCatalogEntry[] = [
  ...desktopTools,
  ...webTools,
  ...customGpts,
  ...codexPlugins,
];
