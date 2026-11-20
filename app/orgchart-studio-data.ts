// Verified release channels and commands, updated November 20, 2026.
// Manual commands match the corresponding public/assets/downloads text files.
export const orgChartStudio = {
  pluginName: "ORNL - OrgChart Studio",
  pluginVersion: "0.5.0",
  browserUrl: "https://adammalin.github.io/Org-Chart-Studio/",
  browserGuidePath: "/web-apps/orgchart-studio",
  browserBuild: "0bce551",
  pluginDirectoryUrl: "https://chatgpt.com/plugins/Plugin_8765a02936388191b4ce25a3ad811246?open_in_app",
  pluginGuidePath: "/resources/orgchart-studio",
  pluginAccess: "Anyone in ORNL with the link",
  pluginUpdatedOn: "November 20, 2026",
  sharingVerifiedOn: "November 20, 2026",
  publicAppVersion: "0.1.0",
  verifiedInstallVersion: "0.2.0",
  verifiedOn: "November 20, 2026",
  guidePath: "/assets/guides/ORNL-OrgChart-Studio-Quick-Start-2026-11-20.pdf",
  macGuidePath: "/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start-2026-11-17.pdf",
} as const;

export const orgChartMacInstall = "/usr/bin/curl --fail --location --show-error \"https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-mac-source-test.zsh\" --output \"$HOME/Downloads/orgchart-studio-install.zsh\" && /bin/zsh \"$HOME/Downloads/orgchart-studio-install.zsh\" \"$HOME/OrgChart-Studio-source-test\"";
export const orgChartWindowsInstall = "powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command \"Set-Location ([IO.Path]::GetTempPath()); Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/install-windows.ps1' -OutFile orgchart-install.ps1 -ErrorAction Stop; & .\\orgchart-install.ps1\"";
export const orgChartOpenPrompt = "Open OrgChart Studio in the browser at https://adammalin.github.io/Org-Chart-Studio/ and check the page's available agent tools. Help me open my existing library without replacing it. Use desktop only if I request it or we are already working there.";
export const orgChartDesktopPrompt = "Open my existing desktop OrgChart Studio on this Mac or Windows computer. Preserve its version and data; install only if missing, and check the local app and MCP connection.";
export const orgChartMonthlyPrompt = "Help me process this month's approved org-chart changes in OrgChart Studio. Check the running app's available tools. Preserve the previous state as a historical checkpoint, compare against current originals linked from https://ornl.sharepoint.com/sites/orgchart, and stage source-linked proposals for review while preserving the official slide arrangement and support roles. After approved changes, help me save a full working library file and verify the downloaded file. Report any unsupported steps.";

export const orgChartNewerFeatures = [
  "Persistent user/agent undo and redo, conflict-aware reviewed reverts, recovery receipts and full working library files.",
  "Monthly updates with before-state checkpoints, a historical timeline and dated role lookup.",
  "A Current designation separate from Draft, source review and AI comparison results.",
  "Organization-tree library navigation and search across organizations, people and roles.",
  "Matrix Support, advisory and shared-service panels separate from supervisory org units.",
  "Captured official-slide card positions, sizes and connector arrangements; compact views remain optional.",
  "Dated AI source comparisons with scope and staleness, exact reviewed change sets and resumable agent batches.",
  "Simple and Advanced modes with tutorials for everyday updates and detailed controls.",
] as const;
