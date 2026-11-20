#!/usr/bin/env python3
"""Build the browser-first guide from the catalog's release data and commands.

Requires reportlab and pypdf. Font files can be supplied with --font-dir.
The dated output is separate from earlier guides; stable aliases are copied by
publication preparation after visual verification.
"""
from __future__ import annotations
import argparse
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Flowable, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
GUIDE_DATE = "November 20, 2026"
DEFAULT_OUTPUT = ROOT / "public/assets/guides/ORNL-OrgChart-Studio-Quick-Start-2026-11-20.pdf"
SITE = "https://adammalin.github.io/Team-App-Library"
GREEN = colors.HexColor("#00662C")
NAVY = colors.HexColor("#00454D")
DARK = colors.HexColor("#373A36")
PALE = colors.HexColor("#EEF4F1")
BORDER = colors.HexColor("#CAD5D0")
ENERGY = colors.HexColor("#7DBA00")
PAGE_W, PAGE_H = letter
WIDTH = PAGE_W - 84


def data():
    text = (ROOT / "app/orgchart-studio-data.ts").read_text()
    def prop(key):
        return json.loads(re.search(rf'\b{key}:\s*("(?:[^"\\]|\\.)*")', text).group(1))
    def const(key):
        return json.loads(re.search(rf'export const {key}\s*=\s*("(?:[^"\\]|\\.)*")', text).group(1))
    values = {k: prop(k) for k in ["browserUrl", "browserGuidePath", "pluginDirectoryUrl", "pluginGuidePath", "pluginVersion", "publicAppVersion", "verifiedInstallVersion"]}
    for platform, key in [("macos", "orgChartMacInstall"), ("windows", "orgChartWindowsInstall")]:
        values[platform] = const(key)
        assert values[platform] == (ROOT / f"public/assets/downloads/orgchart-studio-install-{platform}.txt").read_text().strip()
    return values


def fonts(directory):
    for name, file in [("Body", "Muli-Regular.ttf"), ("Bold", "Muli-Bold.ttf"), ("Heavy", "Muli-ExtraBold.ttf"), ("Mono", "IBMPlexMono-Regular.ttf")]:
        pdfmetrics.registerFont(TTFont(name, str(directory / file)))
    pdfmetrics.registerFontFamily("Body", normal="Body", bold="Bold", italic="Body", boldItalic="Bold")


def styles():
    return {
        "body": ParagraphStyle("body", fontName="Body", fontSize=10, leading=14, textColor=DARK, spaceAfter=7),
        "small": ParagraphStyle("small", fontName="Body", fontSize=8.8, leading=12, textColor=DARK, spaceAfter=6),
        "head": ParagraphStyle("head", fontName="Heavy", fontSize=15, leading=19, textColor=NAVY, spaceBefore=10, spaceAfter=7, keepWithNext=True),
        "box": ParagraphStyle("box", fontName="Body", fontSize=10, leading=14, textColor=NAVY, spaceAfter=5),
        "url": ParagraphStyle("url", fontName="Bold", fontSize=10, leading=14, textColor=NAVY, splitLongWords=True),
    }


class Command(Flowable):
    """Display a wrapped command while preserving its complete copy value."""
    def __init__(self, value, width):
        super().__init__()
        self.value = value
        self.width = width
        self.lines = []
        line = ""
        for char in value:
            if pdfmetrics.stringWidth(line + char, "Mono", 7.1) > width - 24:
                self.lines.append(line)
                line = ""
            line += char
        if line: self.lines.append(line)
        self.height = 20 + len(self.lines) * 10

    def draw(self):
        c = self.canv
        c.setFillColor(PALE)
        c.setStrokeColor(BORDER)
        c.rect(0, 0, self.width, self.height, fill=1, stroke=1)
        c.setFont("Mono", 7.1)
        c.setFillColor(DARK)
        encoded = PDFString(self.value).format(c._doc).decode("latin1")
        c._code.append(f"/Span << /ActualText {encoded} >> BDC")
        for i, line in enumerate(self.lines):
            c.drawString(12, self.height - 16 - i * 10, line)
        c._code.append("EMC")


def build(output, font_dir):
    d = data()
    fonts(font_dir)
    st = styles()
    def p(text, kind="body"): return Paragraph(text, st[kind])
    def link(label, url): return f'<link href="{escape(url, {chr(34): "&quot;"})}" color="#00454D"><u>{escape(label)}</u></link>'
    def h(text): return p(text, "head")
    def box(title, text):
        t = Table([[p(f"<b>{escape(title)}</b>", "box")], [p(text, "box")]], colWidths=[WIDTH - 24])
        t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), PALE), ("BOX", (0, 0), (-1, -1), .6, BORDER), ("LINEBEFORE", (0, 0), (0, -1), 4, GREEN), ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12), ("TOPPADDING", (0, 0), (-1, 0), 10), ("BOTTOMPADDING", (0, -1), (-1, -1), 9)]))
        return t
    headings = [("BROWSER FIRST", "Open and get to work.", "The recommended workflow. No app installation or Studio account needed."), ("COMPANION PLUGIN", "Let Codex help.", f"ORNL - OrgChart Studio v{d['pluginVersion']} | Optional browser-first companion"), ("DESKTOP ALTERNATIVE", "Mac and Windows setup.", "Install only when you need a native desktop workflow.")]
    def chrome(c, doc):
        eyebrow, title, subtitle = headings[min(doc.page - 1, 2)]
        c.saveState()
        c.setFillColor(GREEN); c.rect(0, PAGE_H - 124, PAGE_W, 124, fill=1, stroke=0)
        c.setFillColor(ENERGY); c.rect(0, PAGE_H - 129, PAGE_W, 5, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("Bold", 9); c.drawString(42, PAGE_H - 29, "ORGCHART STUDIO  /  " + eyebrow)
        c.setFont("Heavy", 26); c.drawString(42, PAGE_H - 67, title)
        c.setFont("Body", 9.5); c.drawString(42, PAGE_H - 94, subtitle)
        c.setStrokeColor(BORDER); c.line(42, 38, PAGE_W - 42, 38)
        c.setFillColor(DARK); c.setFont("Body", 8)
        c.drawString(42, 23, f"ORNL OrgChart Studio | Quick start | {GUIDE_DATE}")
        c.drawRightString(PAGE_W - 42, 23, f"{doc.page} / 3")
        c.restoreState()
    story = [
        box("Start here: open the live browser app", link(d["browserUrl"], d["browserUrl"]) + "<br/>The stable link opens the latest published browser version."),
        h("Open your library"),
        p("<b>1. Open or create.</b> Choose <b>Open library</b> for a full <b>.orgchart-workspace</b> file. Keep your original until you verify the restored content. To combine charts with an existing library, use <b>Backup &amp; restore &gt; Merge backup</b>."),
        p("<b>2. Find your organization.</b> Search names, roles or organizations. Browse the Chart library as a flat list or organization tree, then open a chart."),
        p("<b>3. Start in Simple mode.</b> Use it for everyday edits, AI review, saving and history. Advanced exposes detailed source, layout and governance controls. <b>Tips &amp; tour</b> has a walkthrough for each mode."),
        h("Update, review and keep history"),
        p("Edit the selected card or ask the companion to prepare changes (page 2). Inspect the Before and After values before applying AI proposals. Use Undo / Redo for supported edits. A structural check, source comparison and <b>Current</b> designation are separate checks."),
        p("Before monthly updates, preserve the previous state as a checkpoint. Use <b>Monthly updates</b> and <b>History / Timeline</b> to compare versions or see who held a role at an earlier date."),
        h("Save the full library after changes"),
        p("Use <b>Prepare library download</b>, download the file, and confirm only after checking it exists. Where supported, link a chosen file and save directly. Browser recovery and a prepared link do not replace an independent saved file."),
        box("Your file, your storage", "Full working files preserve charts, retained sources, history and resumable agent work. Save in a local OneDrive or Dropbox folder if desired; your sync client uploads it. Studio does not confirm cloud synchronization. Files are <b>unencrypted by default</b>; encryption and a passphrase are optional."),
        Spacer(1, 9),
        p("<b>Diagram outputs:</b> use Publish &amp; export for SVG, PNG, PDF, PowerPoint or CSV. These outputs do not replace the full library. " + link("Browser guide", SITE + d["browserGuidePath"] + "/"), "small"),
        PageBreak(),
        box("Get the optional companion", link("Enable ORNL - OrgChart Studio", d["pluginDirectoryUrl"]) + "<br/>Available to anyone in the ORNL workspace with the link. The app also works without it."),
        h("Enable it once, then start a fresh chat"),
        p("<b>1. Sign in to your ORNL workspace.</b> Open the plugin link above and install or enable <b>ORNL - OrgChart Studio</b>. It is unlisted; use this direct link."),
        p("<b>2. Select it in Codex.</b> Open a fresh chat and select the shared companion. A separate older local pilot does not automatically update. The plugin does not include anyone else's chart database."),
        p("<b>3. Ask it to open the browser app.</b> Keep your library open in Studio so Codex can check the active workspace and discover the page's available tools."),
        box("Try this prompt", "Open OrgChart Studio in the browser. Help me open my existing library and check the available agent tools. Preserve my data and use desktop only if I request it or we are already working there."),
        h("Ask for an update, then review it in Studio"),
        p('For example: <b>"Find [organization] and compare it against its current official chart. Preserve the layout and history, stage the corrections, and show me the Before and After changes for review."</b>'),
        p("The companion can help find organizations and people, import sources, prepare field edits, review layout, run resumable checks, explore checkpoints, and save or export. Inspect the exact proposed change set in the app before Apply; request corrections when needed."),
        p("<b>Official source:</b> " + link("ORNL org-chart SharePoint site", "https://ornl.sharepoint.com/sites/orgchart") + ". Use your ORNL permissions to check its current linked originals. A cached source or structural validation alone does not prove a current source match."),
        h("Monthly updates and connection help"),
        p('Ask: <b>"Save a checkpoint before this month\'s approved changes. Compare the current originals, stage updates for review, then help me save and verify a full working library file."</b>'),
        p("Use <b>Browser AI control</b> to inspect connection status, Reconnect tools, Pause or chart scope. Allow retained-source extraction only for the intended sources. If page tools are unavailable, the companion can use normal app controls and explain the limit."),
        p("Chart content read by AI enters that conversation. Keep passphrases in the app's visible controls. Preparing a download is not a completed save; the companion should verify the actual file before reporting success. " + link("Full companion guide", SITE + d["pluginGuidePath"] + "/"), "small"),
        PageBreak(),
        box("Try the browser first", link(d["browserUrl"], d["browserUrl"]) + "<br/>Desktop uses a separate local MCP connection. Its available features depend on the installed build."),
        h("Ask the companion to open desktop Studio"),
        p('<b>"Open my existing desktop OrgChart Studio on this Mac or Windows computer. Preserve its version and data; install only if missing, and check the local app and MCP connection."</b>'),
        p("Native installation and launch require Codex with local execution on that computer. Reuse an existing working copy. Save and verify a full library file before an intentional update; avoid installing an older build over a newer copy."),
        h("Optional manual installation"),
        p("Use your normal account. Copy one complete command, paste it, then press Enter. The commands below are visually wrapped; the web page's Copy control and plain-text files preserve the single command.", "small"),
        p("<b>Mac: Terminal</b>"), Command(d["macos"], WIDTH), Spacer(1, 6),
        p(link("Copy on the Mac install page", SITE + "/apps/orgchart-studio/install/#mac-install") + " | " + link("Download Mac command", SITE + "/assets/downloads/orgchart-studio-install-macos.txt"), "small"),
        p("<b>Windows: Terminal, Command Prompt, or PowerShell</b>"), Command(d["windows"], WIDTH), Spacer(1, 6),
        p(link("Copy on the Windows install page", SITE + "/apps/orgchart-studio/install/#windows-install") + " | " + link("Download Windows command", SITE + "/assets/downloads/orgchart-studio-install-windows.txt"), "small"),
        h("Launch again and update safely"),
        p("Ask the companion to launch the existing app, or run <b>Start-OrgChart-Studio.command</b> on Mac / <b>Start-OrgChart-Studio.cmd</b> on Windows in the installed folder. A Dock or taskbar icon is not required. Close the app before repair or update."),
        p(f"<b>Separate release channels:</b> manual commands follow public main (v{d['publicAppVersion']}); companion v{d['pluginVersion']} retains its verified v{d['verifiedInstallVersion']} desktop fresh-install pin. The browser update does not change these pins. Inspect the existing version before updating.", "small"),
        p(link("Desktop install, update and launch guide", SITE + "/apps/orgchart-studio/") + " | " + link("Companion setup and access", SITE + d["pluginGuidePath"] + "/"), "small"),
    ]
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(output), pagesize=letter, leftMargin=42, rightMargin=42, topMargin=147, bottomMargin=52, title="OrgChart Studio Quick Start - Browser and Companion Plugin", author="ORNL OrgChart Studio", subject="Browser-first setup, companion plugin, reviewed updates, monthly history, saves and optional desktop installation")
    doc.build(story, onFirstPage=chrome, onLaterPages=chrome)
    from pypdf import PdfReader
    reader = PdfReader(output)
    assert len(reader.pages) == 3, f"Expected three pages, got {len(reader.pages)}"
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--font-dir", type=Path, default=Path("/Library/Fonts"))
    args = parser.parse_args()
    build(args.output, args.font_dir)
