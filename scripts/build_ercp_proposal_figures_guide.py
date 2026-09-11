#!/usr/bin/env python3
"""Build the public DOE Proposal Figure 1 Codex Skill PDF guide.

The version, checksum, download URL, installation prompt, and usage prompt are
read from the same TypeScript source used by the public resource page.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)


REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_SOURCE = REPO_ROOT / "app" / "ercp-proposal-figures-data.ts"
PREVIEW_IMAGE = (
    REPO_ROOT
    / "public"
    / "assets"
    / "screenshots"
    / "ercp-proposal-figures-1.2.0-beta.3-preview.png"
)
DEFAULT_OUTPUT = (
    REPO_ROOT
    / "public"
    / "assets"
    / "guides"
    / "DOE-Proposal-Figure-1-Codex-Skill-Guide-1.2.0-beta.5.pdf"
)

PUBLIC_PAGE_URL = (
    "https://adammalin.github.io/Team-App-Library/resources/ercp-proposal-figures/"
)

GREEN = colors.HexColor("#00662C")
HALE_NAVY = colors.HexColor("#00454D")
GRAPHITE = colors.HexColor("#DBDCDB")
POLAR = colors.white
DARK_MATTER = colors.HexColor("#373A36")
ENERGY = colors.HexColor("#7DBA00")
MIST = colors.HexColor("#8BFEBF")
INFINITY = colors.HexColor("#006BA6")
FORGE = colors.HexColor("#FF9E1B")
PALE_GREEN = colors.HexColor("#EEF6F0")
PALE_BLUE = colors.HexColor("#EDF5F8")
PALE_ORANGE = colors.HexColor("#FFF4E4")
CODE_BG = colors.HexColor("#F3F5F4")

FONT_ROOT = Path("/Library/Fonts")
FONT_REGULAR = FONT_ROOT / "Muli-Regular.ttf"
FONT_SEMIBOLD = FONT_ROOT / "Muli-SemiBold.ttf"
FONT_EXTRABOLD = FONT_ROOT / "Muli-ExtraBold.ttf"
FONT_MONO = FONT_ROOT / "IBMPlexMono-Regular.ttf"
FONT_MONO_BOLD = FONT_ROOT / "IBMPlexMono-SemiBold.ttf"


def register_fonts() -> None:
    required = [
        FONT_REGULAR,
        FONT_SEMIBOLD,
        FONT_EXTRABOLD,
        FONT_MONO,
        FONT_MONO_BOLD,
    ]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Required guide fonts are missing: {missing}")

    pdfmetrics.registerFont(TTFont("Muli", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("Muli-SemiBold", str(FONT_SEMIBOLD)))
    pdfmetrics.registerFont(TTFont("Muli-ExtraBold", str(FONT_EXTRABOLD)))
    pdfmetrics.registerFont(TTFont("IBMPlexMono", str(FONT_MONO)))
    pdfmetrics.registerFont(TTFont("IBMPlexMono-SemiBold", str(FONT_MONO_BOLD)))


def parse_page_data() -> dict[str, str]:
    source = DATA_SOURCE.read_text(encoding="utf-8")
    fields: dict[str, str] = {}
    for key in (
        "name",
        "packageName",
        "version",
        "status",
        "downloadFile",
        "downloadSize",
        "publicDownloadUrl",
        "sha256",
    ):
        match = re.search(rf"\b{key}:\s*\"([^\"]+)\"", source)
        if not match:
            raise ValueError(f"Could not read {key} from {DATA_SOURCE}")
        fields[key] = match.group(1)

    install_match = re.search(
        r"export const ercpInstallPrompt = `(.*?)`;\s*\n\s*export const ercpStartPrompt",
        source,
        re.DOTALL,
    )
    start_match = re.search(
        r"export const ercpStartPrompt = `(.*?)`;\s*$",
        source,
        re.DOTALL,
    )
    if not install_match or not start_match:
        raise ValueError("Could not read the two public prompt templates")

    def expand(template: str) -> str:
        for key, value in fields.items():
            template = template.replace(
                "${ercpProposalFiguresPlugin." + key + "}", value
            )
        template = template.replace(r"\`", "`").replace(r'\"', '"')
        unresolved = re.findall(r"\$\{[^}]+\}", template)
        if unresolved:
            raise ValueError(f"Unresolved prompt substitutions: {unresolved}")
        return template.strip()

    fields["installPrompt"] = expand(install_match.group(1))
    fields["startPrompt"] = expand(start_match.group(1))
    return fields


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "cover_eyebrow": ParagraphStyle(
            "CoverEyebrow",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=8.5,
            leading=11,
            textColor=MIST,
            spaceAfter=10,
            uppercase=True,
            tracking=1.1,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Muli-ExtraBold",
            fontSize=32,
            leading=33,
            textColor=POLAR,
            alignment=TA_LEFT,
            spaceAfter=13,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["Normal"],
            fontName="Muli",
            fontSize=12,
            leading=17,
            textColor=colors.HexColor("#DFF8E8"),
            spaceAfter=16,
        ),
        "cover_meta": ParagraphStyle(
            "CoverMeta",
            parent=base["Normal"],
            fontName="Muli-SemiBold",
            fontSize=8.5,
            leading=12,
            textColor=POLAR,
        ),
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=7.5,
            leading=10,
            textColor=GREEN,
            spaceAfter=5,
            tracking=0.9,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Muli-ExtraBold",
            fontSize=24,
            leading=26,
            textColor=HALE_NAVY,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Muli-ExtraBold",
            fontSize=16,
            leading=19,
            textColor=HALE_NAVY,
            spaceBefore=10,
            spaceAfter=7,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="Muli-ExtraBold",
            fontSize=10.5,
            leading=13,
            textColor=HALE_NAVY,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Muli",
            fontSize=9.2,
            leading=13.2,
            textColor=DARK_MATTER,
            spaceAfter=7,
        ),
        "body_bold": ParagraphStyle(
            "BodyBold",
            parent=base["BodyText"],
            fontName="Muli-SemiBold",
            fontSize=9.2,
            leading=13.2,
            textColor=DARK_MATTER,
            spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Muli",
            fontSize=7.6,
            leading=10.4,
            textColor=colors.HexColor("#5B615C"),
        ),
        "small_white": ParagraphStyle(
            "SmallWhite",
            parent=base["BodyText"],
            fontName="Muli",
            fontSize=7.6,
            leading=10.4,
            textColor=POLAR,
        ),
        "card_number": ParagraphStyle(
            "CardNumber",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=18,
            leading=20,
            textColor=GREEN,
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=9.5,
            leading=11.5,
            textColor=HALE_NAVY,
            spaceAfter=3,
        ),
        "card_body": ParagraphStyle(
            "CardBody",
            parent=base["Normal"],
            fontName="Muli",
            fontSize=7.7,
            leading=10.5,
            textColor=DARK_MATTER,
        ),
        "prompt_label": ParagraphStyle(
            "PromptLabel",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=8.5,
            leading=11,
            textColor=POLAR,
            spaceAfter=0,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="IBMPlexMono",
            fontSize=6.8,
            leading=9.2,
            textColor=colors.HexColor("#26302B"),
            backColor=CODE_BG,
            leftIndent=10,
            rightIndent=10,
            spaceAfter=10,
            splitLongWords=True,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=base["Normal"],
            fontName="Muli-ExtraBold",
            fontSize=7.5,
            leading=10,
            textColor=POLAR,
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=base["Normal"],
            fontName="Muli",
            fontSize=7.8,
            leading=10.8,
            textColor=DARK_MATTER,
        ),
        "table_cell_bold": ParagraphStyle(
            "TableCellBold",
            parent=base["Normal"],
            fontName="Muli-SemiBold",
            fontSize=7.8,
            leading=10.8,
            textColor=HALE_NAVY,
        ),
    }


def body_paragraph(text: str, styles: dict[str, ParagraphStyle]) -> Paragraph:
    return Paragraph(text, styles["body"])


def bullet_list(items: list[str], styles: dict[str, ParagraphStyle]) -> Table:
    rows = [
        [
            "",
            Paragraph(item, styles["body"]),
        ]
        for item in items
    ]
    table = Table(rows, colWidths=[0.07 * inch, 6.53 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), GREEN),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("LEFTPADDING", (1, 0), (1, -1), 9),
            ]
        )
    )
    return table


def info_box(
    title: str,
    text: str,
    styles: dict[str, ParagraphStyle],
    *,
    tone: str = "green",
) -> Table:
    palette = {
        "green": (GREEN, PALE_GREEN),
        "blue": (INFINITY, PALE_BLUE),
        "orange": (FORGE, PALE_ORANGE),
    }
    accent, background = palette[tone]
    table = Table(
        [[Paragraph(title, styles["h3"]), Paragraph(text, styles["body"])]],
        colWidths=[1.55 * inch, 5.05 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.6, GRAPHITE),
                ("LINEBEFORE", (0, 0), (0, -1), 5, accent),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def step_card(
    number: str,
    title: str,
    text: str,
    styles: dict[str, ParagraphStyle],
) -> Table:
    card = Table(
        [
            [Paragraph(number, styles["card_number"])],
            [Paragraph(title, styles["card_title"])],
            [Paragraph(text, styles["card_body"])],
        ],
        colWidths=[3.15 * inch],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F5F7F6")),
                ("BOX", (0, 0), (-1, -1), 0.6, GRAPHITE),
                ("LINEABOVE", (0, 0), (-1, 0), 4, GREEN),
                ("LEFTPADDING", (0, 0), (-1, -1), 11),
                ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return card


def two_column_cards(left: Table, right: Table) -> Table:
    table = Table([[left, right]], colWidths=[3.25 * inch, 3.25 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 8),
                ("LEFTPADDING", (1, 0), (1, 0), 8),
            ]
        )
    )
    return table


def prompt_block(
    label: str,
    prompt: str,
    styles: dict[str, ParagraphStyle],
) -> list:
    header = Table(
        [[Paragraph(label, styles["prompt_label"])]],
        colWidths=[6.6 * inch],
        hAlign="LEFT",
    )
    header.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HALE_NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return [
        header,
        Spacer(1, 5),
        Preformatted(prompt, styles["code"], maxLineLength=105, splitChars=" "),
    ]


def draw_cover(canvas, doc) -> None:
    width, height = letter
    canvas.saveState()
    canvas.setTitle("DOE Proposal Figure 1 Codex Skill - Install and Use Guide")
    canvas.setAuthor("Team App Library")
    canvas.setSubject(
        "Install and use the create-ercp-proposal-figures skill in Codex"
    )
    canvas.setFillColor(GREEN)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(HALE_NAVY)
    canvas.rect(width * 0.73, 0, width * 0.27, height, stroke=0, fill=1)
    canvas.setStrokeColor(colors.Color(1, 1, 1, alpha=0.14))
    canvas.setLineWidth(1)
    canvas.translate(width - 70, height - 120)
    canvas.rotate(42)
    canvas.rect(-90, -90, 245, 245, stroke=1, fill=0)
    canvas.restoreState()


def draw_body(canvas, doc) -> None:
    width, height = letter
    canvas.saveState()
    canvas.setFillColor(GREEN)
    canvas.rect(0, height - 10, width, 10, stroke=0, fill=1)
    canvas.setFont("Muli-SemiBold", 7.2)
    canvas.setFillColor(HALE_NAVY)
    canvas.drawString(doc.leftMargin, height - 24, "DOE PROPOSAL FIGURE 1 | CODEX SKILL GUIDE")
    canvas.setStrokeColor(GRAPHITE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 33, width - doc.rightMargin, 33)
    canvas.setFont("Muli", 7.2)
    canvas.setFillColor(colors.HexColor("#656A66"))
    canvas.drawString(doc.leftMargin, 20, "Team App Library | Beta collaboration resource")
    canvas.drawRightString(width - doc.rightMargin, 20, str(doc.page))
    canvas.restoreState()


def build_story(data: dict[str, str], styles: dict[str, ParagraphStyle]) -> list:
    version = escape(data["version"])
    download_url = escape(data["publicDownloadUrl"])
    checksum = escape(data["sha256"])
    page_url = escape(PUBLIC_PAGE_URL)

    story: list = [
        Paragraph("TEAM APP LIBRARY | CODEX RESOURCE", styles["cover_eyebrow"]),
        Paragraph("DOE Proposal Figure 1", styles["cover_title"]),
        Paragraph(
            "Install and use the <b>$create-ercp-proposal-figures</b> skill to turn a "
            "substantive ERCP or ECRP proposal into a source-grounded, completely "
            "label-free Figure 1 collaboration draft.",
            styles["cover_subtitle"],
        ),
        Image(str(PREVIEW_IMAGE), width=7.0 * inch, height=4.667 * inch),
        Spacer(1, 7),
        Paragraph(
            "Example beta output from a cleared qualification proposal. Every generated "
            "result still requires scientist and graphic-designer review.",
            styles["small_white"],
        ),
        Spacer(1, 13),
        Table(
            [
                [
                    Paragraph(
                        f"<b>VERSION</b><br/>{version}", styles["cover_meta"]
                    ),
                    Paragraph(
                        "<b>DELIVERABLE</b><br/>One 1536 x 1024 PNG draft",
                        styles["cover_meta"],
                    ),
                    Paragraph(
                        "<b>STATUS</b><br/>Beta - human review required",
                        styles["cover_meta"],
                    ),
                ]
            ],
            colWidths=[2.15 * inch, 2.4 * inch, 2.45 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.Color(0, 0, 0, alpha=0.12)),
                    ("BOX", (0, 0), (-1, -1), 0.7, colors.Color(1, 1, 1, alpha=0.25)),
                    ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.Color(1, 1, 1, alpha=0.2)),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ]
            ),
        ),
        NextPageTemplate("body"),
        PageBreak(),
        Paragraph("01 | QUICK START", styles["eyebrow"]),
        Paragraph("From install to review in four controlled moves.", styles["h1"]),
        body_paragraph(
            "The skill carries the repeatable workflow; the proposal remains the authority "
            "for science, claims, and sponsor impact. Use only source material approved for "
            "the selected AI environment.",
            styles,
        ),
        Spacer(1, 5),
        two_column_cards(
            step_card(
                "01",
                "Install the plugin",
                "Paste the complete installation prompt from this guide into a Codex task.",
                styles,
            ),
            step_card(
                "02",
                "Open a fresh task",
                "After Codex confirms installation, start a new task so the skill is loaded.",
                styles,
            ),
        ),
        Spacer(1, 14),
        two_column_cards(
            step_card(
                "03",
                "Attach the proposal",
                "Add one substantive, cleared proposal and any optional visual reference.",
                styles,
            ),
            step_card(
                "04",
                "Paste the usage prompt",
                "Let the workflow analyze, generate, inspect, select, and return one draft.",
                styles,
            ),
        ),
        Spacer(1, 18),
        Paragraph("Before you begin", styles["h2"]),
        info_box(
            "You need",
            "A current Codex desktop app or Codex CLI; image generation available in the "
            "Codex environment; one substantive proposal in DOCX, PDF, Markdown, or text "
            "form; and, optionally, an existing Figure 1, Roadmap, sketch, or style reference.",
            styles,
            tone="green",
        ),
        Spacer(1, 9),
        info_box(
            "You receive",
            "One opaque 1536 x 1024 raster PNG collaboration draft with no labels, captions, "
            "paragraphs, legend, or embedded text. Color-role and remaining science-review "
            "notes stay in the Codex chat. Prompts, candidates, and QA records remain in the "
            "local run archive.",
            styles,
            tone="blue",
        ),
        Spacer(1, 9),
        info_box(
            "Information boundary",
            "Do not process classified, CUI, export-controlled, proprietary, embargoed, "
            "personal, or otherwise sensitive material unless both the selected environment "
            "and organizational rules explicitly authorize it. Use a cleared, redacted, public, "
            "or fictional substitute when needed.",
            styles,
            tone="orange",
        ),
        Spacer(1, 15),
        Paragraph(
            f'<b>Live resource:</b> <link href="{page_url}" color="#006BA6">{page_url}</link>',
            styles["body"],
        ),
        PageBreak(),
        Paragraph("02 | INSTALL", styles["eyebrow"]),
        Paragraph("Install the complete plugin with one checked prompt.", styles["h1"]),
        body_paragraph(
            "Open a Codex task, copy the complete prompt below, and paste it without editing. "
            "The prompt authorizes only the exact public ZIP, checksum, personal-plugin location, "
            "and marketplace entry needed for this installation.",
            styles,
        ),
        Table(
            [
                [Paragraph("PACKAGE", styles["table_head"]), Paragraph(data["downloadFile"], styles["table_cell"])],
                [Paragraph("VERSION", styles["table_head"]), Paragraph(version, styles["table_cell"])],
                [Paragraph("DOWNLOAD", styles["table_head"]), Paragraph(f'<link href="{download_url}" color="#006BA6">{download_url}</link>', styles["table_cell"])],
                [Paragraph("SHA-256", styles["table_head"]), Paragraph(f'<font name="IBMPlexMono" size="6.4">{checksum}</font>', styles["table_cell"])],
            ],
            colWidths=[0.95 * inch, 5.65 * inch],
            hAlign="LEFT",
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (0, -1), HALE_NAVY),
                    ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#F5F7F6")),
                    ("BOX", (0, 0), (-1, -1), 0.6, GRAPHITE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.4, GRAPHITE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            ),
        ),
        Spacer(1, 12),
        Paragraph("What the checked install protects", styles["h2"]),
        bullet_list(
            [
                "The exact public ZIP and SHA-256 are verified before extraction.",
                "Both authored manifests and the complete skill package are preserved.",
                "Only the plugin's personal source and marketplace entry may change.",
                "Installation stops before any proposal is read or any image is generated.",
            ],
            styles,
        ),
        PageBreak(),
        *prompt_block(
            "COPY THE COMPLETE INSTALLATION PROMPT",
            data["installPrompt"],
            styles,
        ),
        Paragraph("Installation is complete when Codex confirms:", styles["h2"]),
        bullet_list(
            [
                f"<b>{escape(data['packageName'])}</b> is installed and enabled at version <b>{version}</b>.",
                "The installed source and cache contain the complete skill, eight legacy layout references, one certified flat-style target, fictional fixtures, and validation scripts.",
                "The plugin self-test passed and the reported installed source is the intended personal source.",
                "No proposal was read and no figure was generated during installation.",
            ],
            styles,
        ),
        info_box(
            "Fresh task required",
            "Open a new Codex task before proposal work so the newly installed skill is loaded. "
            "Restart the desktop app only if the plugin does not appear in the Plugins Directory "
            "or a new task.",
            styles,
            tone="blue",
        ),
        PageBreak(),
        Paragraph("03 | USE", styles["eyebrow"]),
        Paragraph("Attach the proposal, then start the Figure 1 workflow.", styles["h1"]),
        body_paragraph(
            "In the fresh task, attach one substantive proposal and any optional Figure 1, "
            "Roadmap, sketch, or style reference. The proposal supplies the science. A companion "
            "visual may guide visual character, but it cannot overwrite concepts or claims.",
            styles,
        ),
        *prompt_block("COPY THE FIGURE 1 PROMPT", data["startPrompt"], styles),
        Paragraph("What Codex does next", styles["h2"]),
        Table(
            [
                [Paragraph("1", styles["card_number"]), Paragraph("Reads the proposal and freezes exact source support.", styles["table_cell"])],
                [Paragraph("2", styles["card_number"]), Paragraph("Freezes one source-backed before/action/after scientific claim and its correct relationship topology instead of a methods inventory or Roadmap.", styles["table_cell"])],
                [Paragraph("3", styles["card_number"]), Paragraph("Maps three to five proposal-specific forms, one dominant funding path, a science-based payoff, and a consistent palette.", styles["table_cell"])],
                [Paragraph("4", styles["card_number"]), Paragraph("Uses legacy examples for written layout planning, attaches only the certified flat-style target, and generates two label-free PNG candidates.", styles["table_cell"])],
                [Paragraph("5", styles["card_number"]), Paragraph("Allows at most one focused repair and returns only the strongest usable draft.", styles["table_cell"])],
            ],
            colWidths=[0.42 * inch, 6.18 * inch],
            hAlign="LEFT",
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F5F7F6")),
                    ("BOX", (0, 0), (-1, -1), 0.6, GRAPHITE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.4, GRAPHITE),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            ),
        ),
        PageBreak(),
        Paragraph("04 | REVIEW", styles["eyebrow"]),
        Paragraph("Review the concept before it becomes proposal art.", styles["h1"]),
        body_paragraph(
            "The returned PNG is an AI-generated collaboration draft for redraw and verification. "
            "It is not approved, scientifically validated, submission-ready, or a substitute for "
            "professional design and content-owner review.",
            styles,
        ),
        Paragraph("Source and science checks", styles["h2"]),
        bullet_list(
            [
                "Every depicted system, mechanism, relationship, endpoint, and sponsor impact traces to the proposal.",
                "No generic cars, turbines, factories, certificates, checkmarks, globes, lightbulbs, or innovation symbols replace the proposal's scientific payoff.",
                "The visible before state, scientific action, changed after state, and relationship topology remain faithful to the source.",
                "The primary capability remains the proposal's capability, not a secondary analysis method.",
                "The DOE payoff is source-supported rather than invented.",
            ],
            styles,
        ),
        Paragraph("Image and persuasion checks", styles["h2"]),
        bullet_list(
            [
                "No meaningful text, labels, captions, paragraphs, legends, or label-like marks appear in the raster.",
                "One dominant reading path and one primary visual claim are visible at full size and thumbnail size.",
                "The system, gap, capability, decisive relationship, endpoint, and DOE payoff remain recognizable.",
                "Color consistently distinguishes proposal elements while the output stays brand-neutral.",
                "The polished flat editorial hierarchy remains clear enough for a designer redraw.",
                "Modest nonfrontal views, shallow diagrammatic faces, flat layered offsets, and contained tonal variation are advisory redraw notes when they do not imply realistic thickness or lighting.",
                "Strong perspective, extrusion, dimensional lighting or highlights, gloss, glow, reflections, and cast shadows fail the flat-style gate.",
                "A graphic designer can interpret and redraw the result without treating generated pixels as evidence.",
            ],
            styles,
        ),
        info_box(
            "Brand-neutral output",
            "This guide uses Team App Library/ORNL visual styling. The generated Figure 1 does not. "
            "The skill does not imitate ORNL or any other organization's logo, typography, geometry, "
            "or recognition palette.",
            styles,
            tone="green",
        ),
        Spacer(1, 10),
        info_box(
            "Handoff boundary",
            "A scientist or proposal author verifies the science. A graphic designer redraws or "
            "polishes the concept and adds any final labels or legend through controlled design. "
            "The team obtains content, science, accessibility, classification, and brand reviews "
            "before submission or distribution.",
            styles,
            tone="orange",
        ),
        PageBreak(),
        Paragraph("05 | TROUBLESHOOT", styles["eyebrow"]),
        Paragraph("Recover cleanly when setup or QA stops.", styles["h1"]),
        Table(
            [
                [Paragraph("SYMPTOM", styles["table_head"]), Paragraph("WHAT TO DO", styles["table_head"])],
                [Paragraph("Download is blocked", styles["table_cell_bold"]), Paragraph("Use the same direct ZIP link as a manual-download fallback. Do not use a mirror or a differently named package.", styles["table_cell"])],
                [Paragraph("Plugin is missing", styles["table_cell_bold"]), Paragraph("Open a fresh task. Restart the desktop app only if the plugin is still absent from the Plugins Directory or new task.", styles["table_cell"])],
                [Paragraph("Source cannot be read", styles["table_cell_bold"]), Paragraph("Stop. Supply a substantive, text-extractable, cleared proposal or an approved substitute.", styles["table_cell"])],
                [Paragraph("OCR is unavailable", styles["table_cell_bold"]), Paragraph("Require full-size visual inspection and record the limitation. Do not report a false label pass.", styles["table_cell"])],
                [Paragraph("Draft has a broad defect", styles["table_cell_bold"]), Paragraph("Do not repeatedly regenerate. A single controlled whole-image flattening pass is allowed only when science, hierarchy, objects, and every non-style gate already pass; structural defects require fresh generation or a disclosed best-effort handoff.", styles["table_cell"])],
            ],
            colWidths=[1.45 * inch, 5.15 * inch],
            hAlign="LEFT",
            repeatRows=1,
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), HALE_NAVY),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F7F8F7")),
                    ("BOX", (0, 0), (-1, -1), 0.6, GRAPHITE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.4, GRAPHITE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            ),
        ),
        Spacer(1, 15),
        Paragraph("Keep the boundary clear", styles["h2"]),
        body_paragraph(
            f"Version {version} creates Figure 1 collaboration drafts only. It does not "
            "create a proposal Roadmap, edit the source proposal, produce vector artwork, or "
            "deliver a submission-ready final figure.",
            styles,
        ),
        Spacer(1, 8),
        Paragraph(
            f'<b>Return to the live guide and current downloads:</b><br/><link href="{page_url}" color="#006BA6">{page_url}</link>',
            styles["body"],
        ),
    ]
    return story


def build_pdf(output: Path) -> None:
    register_fonts()
    data = parse_page_data()
    styles = make_styles()
    output.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.58 * inch,
        title="DOE Proposal Figure 1 Codex Skill - Install and Use Guide",
        author="Team App Library",
        subject="Install and use the create-ercp-proposal-figures skill in Codex",
    )
    cover_frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="cover-frame",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    body_frame = Frame(
        doc.leftMargin,
        0.55 * inch,
        doc.width,
        letter[1] - 1.15 * inch,
        id="body-frame",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=draw_cover),
            PageTemplate(id="body", frames=[body_frame], onPage=draw_body),
        ]
    )
    doc.build(build_story(data, styles))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    build_pdf(args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
