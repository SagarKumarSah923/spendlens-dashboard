# Spendlens Expense Dashboard

A simple React + Vite dashboard that converts international expenses to USD, ranks category spend, and supports live filtering and row sorting.

## What this project does
- Converts the provided expense dataset into USD using fixed exchange rates.
- Displays summary cards: ranked category totals, overall spend, top 3 merchants.
- Shows a sortable expense table and allows adding new expenses in memory.

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
- The EUR rate can be adjusted in code later; the current demo uses the snapshot rates.

## Live URL
- Pending deployment.
