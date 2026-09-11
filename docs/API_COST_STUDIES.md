# API Cost Studies content workflow

Use this workflow to add a dated, repeatable cost study without overwriting earlier evidence.

## Study unit

One study represents one versioned tool or workflow tested against one fixed task on one date. Each model, mode, or thinking-effort result is one datapoint within that study.

Record these fields for every study:

- observation date;
- tool type, exact name, version, and link;
- fixed task and exact starting prompt, preserving capitalization and punctuation;
- the exact source brief or input file, with its filename and SHA-256 hash;
- measurement system and pricing basis;
- monthly credit limit assumption;
- one datapoint per exact model setting;
- credits and displayed-dollar delta per complete request;
- maximum monthly runs calculated from the stated limit;
- output count, elapsed time when visible, QA status, and a concise result note;
- limitations and a dated recommendation.

## Public evidence boundary

Publish the fixed test inputs, calculated deltas, structured data, comparison reports, and per-setting reports when the source files are cleared for the site. Do not publish cumulative account balances or the private before/after usage screenshots used to calculate the deltas.

The current studies use Workspace credit deltas and the usage page's displayed dollar estimate. Keep that basis explicit. Do not relabel those numbers as token-metered API invoices or a durable OpenAI API price list.

## Add a new study

1. Create a new immutable folder under `public/assets/cost-studies/` using `YYYY-MM-DD-tool-version`.
2. Copy the exact source brief or input file, comparison PDF, and each per-setting PDF into that folder.
3. Add `study-data.json` using schema version `1.0` from the first study as a template. Store the literal test prompt in `workflow.prompt` and describe each fixed input in `sourceFiles` with a SHA-256 hash.
4. Keep `datapoints` sorted from lowest to highest `displayedEstimatedCostPerRunUsd`; preserve a stable `id` for repeated settings.
5. Add the JSON import to `app/api-cost-studies-data.ts` and append the typed study to `apiCostStudies`.
6. Run `npm test`, `npm run lint`, and `npm run test:pages`.
7. Verify the exported index, detail page, JSON, source-file link, and every PDF link before publishing.

When the same test is repeated later, create a new dated study folder and entry. Do not replace the earlier measurement; the archive is designed to show change over time.
