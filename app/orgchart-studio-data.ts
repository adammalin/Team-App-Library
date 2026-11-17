// Verified release channels and commands, updated November 17, 2026.
// Manual commands match the corresponding public/assets/downloads text files.
export const orgChartStudio = {
  pluginName: "ORNL - OrgChart Studio",
  pluginVersion: "0.3.2",
  pluginDirectoryUrl: "https://chatgpt.com/plugins/Plugin_8765a02936388191b4ce25a3ad811246?open_in_app",
  pluginGuidePath: "/resources/orgchart-studio",
  pluginAccess: "Private pilot · Access required",
  publicAppVersion: "0.1.0",
  verifiedInstallVersion: "0.2.0",
  localAppVersion: "0.3.0",
  verifiedOn: "November 17, 2026",
  guidePath: "/assets/guides/ORNL-OrgChart-Studio-Desktop-Quick-Start-2026-11-17.pdf",
  macGuidePath: "/assets/guides/ORNL-OrgChart-Studio-macOS-Quick-Start-2026-11-17.pdf",
} as const;

export const orgChartMacInstall = "/usr/bin/curl --fail --location --show-error \"https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/bootstrap-mac-source-test.zsh\" --output \"$HOME/Downloads/orgchart-studio-install.zsh\" && /bin/zsh \"$HOME/Downloads/orgchart-studio-install.zsh\" \"$HOME/OrgChart-Studio-source-test\"";
export const orgChartWindowsInstall = "powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command \"Set-Location ([IO.Path]::GetTempPath()); Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/adammalin/Org-Chart-Studio/main/scripts/install-windows.ps1' -OutFile orgchart-install.ps1 -ErrorAction Stop; & .\\orgchart-install.ps1\"";
export const orgChartOpenPrompt = "Open OrgChart Studio; install it if needed, then check the local app connection. Reuse my existing working installation and preserve its version and data.";
export const orgChartMonthlyPrompt = "Help me process this month's approved org-chart changes in OrgChart Studio. Check which monthly tools my installed version supports. Save the previous state before edits, stage source-linked proposals for review, preserve the official slide arrangement and support roles where supported, then help me save the reviewed state and a full backup. Report any unsupported steps.";

export const orgChartNewerFeatures = [
  "Monthly updates with before-state checkpoints, a historical timeline and dated role lookup.",
  "A Current designation separate from Draft, source review and AI comparison results.",
  "Organization-tree library navigation and search across organizations, people and roles.",
  "Matrix Support, advisory and shared-service panels separate from supervisory org units.",
  "Captured official-slide card positions, sizes and connector arrangements; compact views remain optional.",
  "Dated AI source comparisons with scope and staleness; schema-v6 backups preserve layout, support panels and history.",
] as const;
