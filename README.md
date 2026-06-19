# Spendlens Expense Dashboard

A simple React + Vite dashboard that converts international expenses to USD, ranks category spend, and supports live filtering and row sorting.

## What this project does
- Converts the provided expense dataset into USD using fixed exchange rates.
- Displays summary cards: ranked category totals, overall spend, top 3 merchants.
- Shows a sortable expense table and allows adding new expenses in memory.
- Includes a "what-if" slider to re-rate EUR/USD and see category totals recalculate instantly (stretch feature).

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```

## Files and folders
- `src/App.tsx` — main dashboard UI, summary logic, filtering, sorting, and add-expense form.
- `src/data.ts` — static exchange rates and expense dataset.
- `src/App.css` — component styling for summary cards, table, and form.
- `src/main.tsx` — React app entry point.
- `docs/ceo-brief.md` — plain-English CEO summary.
- `docs/edge-cases.md` — identified failure modes and handling.

## Known limitations
- Data is stored in memory only; refreshing the page resets any new expenses.
- The add-expense form does not validate every input case (e.g. very large values, duplicate merchants).
- No backend or authentication is included.

## Assumptions
- The app only needs to support the listed currencies and categories from the assignment.
- The table should update immediately after adding an expense even without persistence.
- The "what-if" EUR/USD slider only re-rates EUR-denominated rows; all other currencies stay on the fixed snapshot.

## What I'd fix with another 4 hours
- Add input validation messaging on the add-expense form (currently it silently ignores bad input instead of showing an error).
- Persist new expenses to `localStorage` so a refresh doesn't wipe them.
- Add a proper mobile breakpoint for the expense table (currently it just shrinks and gets cramped below ~480px).
- Guard against duplicate merchant names / case-insensitive merchant matching in the top-3 merchants calc.

## Live URL
- Pending deployment. Deploy with `npm run build` then drag the `dist/` folder into Netlify, or run `vercel` / connect the GitHub repo to Vercel for a one-click deploy. Update this line with the live URL once deployed — the grader will only evaluate a working hosted link, not local screenshots.
