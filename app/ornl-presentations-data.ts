export const ornlPresentationsPlugin = {
  name: "ORNL – Presentations",
  version: "0.6.18",
  pluginDirectoryUrl:
    "https://chatgpt.com/plugins/Plugin_0f2f62ae9f888191b96d515afe1c6101?open_in_app",
} as const;

export const presentationsCreatePrompt = `Use $start-ornl-presentations to create an editable ORNL PowerPoint draft from the sources attached to this message.

The audience is [audience], the presentation purpose is [purpose], and the available speaking time is [minutes]. Preserve approved content, use the ORNL template and its custom colors, and save a new versioned draft. Review the saved slides for content, layout, and editability.`;

export const presentationsRedesignPrompt = `Use $clean-up-ornl-presentations to substantially redesign the presentation attached to this message.

Preserve approved content, scientific meaning, useful visual hierarchy, and editable text. Use the ORNL template and preserve its custom colors. Compare every source slide with the final slide and save a new versioned PowerPoint draft with review notes.`;
