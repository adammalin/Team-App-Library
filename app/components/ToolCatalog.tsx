"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AppWindow,
  ArrowRight,
  ArrowSquareOut,
  Browser,
  ChatCircleDots,
  MagnifyingGlass,
  MapTrifold,
  PlugsConnected,
  X,
} from "@phosphor-icons/react";
import type {
  ToolAction,
  ToolCatalogEntry,
  ToolCategory,
} from "../tool-catalog-data";

const toolCategoryOrder: ToolCategory[] = [
  "desktop-app",
  "web-app",
  "custom-gpt",
  "codex-plugin",
];

const categoryDetails: Record<
  ToolCategory,
  { label: string; singular: string; intro: string }
> = {
  "desktop-app": {
    label: "Desktop apps",
    singular: "Desktop app",
    intro: "Installable tools with complete setup, usage, and AI integration guidance.",
  },
  "web-app": {
    label: "Web apps",
    singular: "Web app",
    intro: "Focused browser-based tools that open directly and work across devices.",
  },
  "custom-gpt": {
    label: "Custom GPTs",
    singular: "Custom GPT",
    intro: "Preferred current GPTs with previous-version links kept available when needed.",
  },
  "codex-plugin": {
    label: "Codex plugins",
    singular: "Codex plugin",
    intro: "Purpose-built Codex workflows with installation, use, and review guidance.",
  },
};

function CategoryIcon({ category }: { category: ToolCategory }) {
  if (category === "web-app") return <Browser weight="duotone" />;
  if (category === "custom-gpt") return <ChatCircleDots weight="duotone" />;
  if (category === "codex-plugin") return <PlugsConnected weight="duotone" />;
  return <AppWindow weight="duotone" />;
}

function ToolMark({ tool }: { tool: ToolCatalogEntry }) {
  if (tool.iconKind === "image" && tool.icon) {
    return (
      <span className="tool-card__mark tool-card__mark--image">
        <Image src={tool.icon} alt="" width={72} height={72} unoptimized />
      </span>
    );
  }

  if (tool.iconKind === "map") {
    return (
      <span className="tool-card__mark" aria-hidden="true">
        <MapTrifold weight="duotone" />
      </span>
    );
  }

  return (
    <span className="tool-card__mark" aria-hidden="true">
      <CategoryIcon category={tool.category} />
    </span>
  );
}

function ToolActionLink({ action }: { action: ToolAction }) {
  const content = (
    <>
      {action.label}
      {action.external ? <ArrowSquareOut /> : <ArrowRight />}
    </>
  );
  const className = action.kind === "secondary" ? "is-secondary" : undefined;

  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {content}
    </Link>
  );
}

function ToolCard({ tool }: { tool: ToolCatalogEntry }) {
  const previousVersions = tool.versions?.filter((version) => !version.current) ?? [];

  return (
    <article className="tool-card">
      <div className="tool-card__topline">
        <ToolMark tool={tool} />
        <span>{tool.versionLabel}</span>
      </div>
      <div className="tool-card__body">
        <span className="eyebrow">{tool.kicker}</span>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div className="tool-card__tags" aria-label={`${tool.name} keywords`}>
          {tool.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      {previousVersions.length > 0 ? (
        <div className="tool-versions">
          <div className="tool-versions__current">
            <span>Current</span>
            <strong>{tool.versions?.find((version) => version.current)?.version}</strong>
          </div>
          <details>
            <summary>Previous versions ({previousVersions.length})</summary>
            <div className="tool-versions__list">
              {previousVersions.map((version) => (
                <a key={version.version} href={version.href} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{version.version}</strong>
                    {version.label}
                  </span>
                  <ArrowSquareOut />
                </a>
              ))}
            </div>
          </details>
        </div>
      ) : null}

      <div className="tool-card__actions">
        {tool.actions.map((action) => (
          <ToolActionLink action={action} key={`${action.label}-${action.href}`} />
        ))}
      </div>
    </article>
  );
}

export function ToolCatalog({ tools }: { tools: ToolCatalogEntry[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        toolCategoryOrder.map((category) => [
          category,
          tools.filter((tool) => tool.category === category).length,
        ]),
      ) as Record<ToolCategory, number>,
    [tools],
  );

  const visibleTools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return tools.filter((tool) => {
      const categoryMatches = activeCategory === "all" || tool.category === activeCategory;
      const searchableText = [
        tool.name,
        tool.kicker,
        tool.description,
        tool.versionLabel,
        categoryDetails[tool.category].label,
        ...tool.tags,
        ...(tool.versions?.flatMap((version) => [version.version, version.label]) ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, query, tools]);

  const visibleGroups = toolCategoryOrder
    .map((category) => ({
      category,
      tools: visibleTools.filter((tool) => tool.category === category),
    }))
    .filter((group) => group.tools.length > 0);

  function resetFilters() {
    setQuery("");
    setActiveCategory("all");
  }

  return (
    <section id="tools" className="tool-catalog" aria-labelledby="tool-catalog-title">
      <div className="section-heading tool-catalog__heading">
        <div>
          <span className="eyebrow">Available now</span>
          <h2 id="tool-catalog-title">Find the right tool.</h2>
        </div>
        <p>Search by name, task, format, platform, or technology—or browse one category.</p>
      </div>

      <div className="catalog-search">
        <label htmlFor="tool-search">Search the catalog</label>
        <div className="catalog-search__field">
          <MagnifyingGlass aria-hidden="true" />
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “QR”, “PowerPoint”, “macOS”, or “brand”"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X />
            </button>
          ) : null}
        </div>
      </div>

      <div className="category-filters" aria-label="Filter tools by category">
        <button
          type="button"
          className={activeCategory === "all" ? "is-active" : undefined}
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All tools <span>{tools.length}</span>
        </button>
        {toolCategoryOrder.map((category) => (
          <button
            type="button"
            className={activeCategory === category ? "is-active" : undefined}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            key={category}
          >
            {categoryDetails[category].label} <span>{categoryCounts[category]}</span>
          </button>
        ))}
      </div>

      <p className="catalog-results" aria-live="polite">
        Showing {visibleTools.length} of {tools.length} tools
        {activeCategory === "all" ? "" : ` in ${categoryDetails[activeCategory].label}`}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {visibleGroups.length > 0 ? (
        <div className="tool-groups">
          {visibleGroups.map((group) => (
            <section
              className={`tool-group tool-group--${group.category}`}
              aria-labelledby={`heading-${group.category}`}
              key={group.category}
            >
              <div className="tool-group__heading">
                <span aria-hidden="true">
                  <CategoryIcon category={group.category} />
                </span>
                <div>
                  <h3 id={`heading-${group.category}`}>{categoryDetails[group.category].label}</h3>
                  <p>{categoryDetails[group.category].intro}</p>
                </div>
              </div>
              <div className="tool-grid">
                {group.tools.map((tool) => (
                  <ToolCard tool={tool} key={`${tool.category}-${tool.slug}`} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <strong>No tools match those filters.</strong>
          <p>Try another keyword or return to the complete catalog.</p>
          <button type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
