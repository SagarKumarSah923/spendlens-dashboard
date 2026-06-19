# CEO Brief

## What I built and why it matters
I built a working expense dashboard for Spendlens that turns a messy multi-currency expense list into clear USD totals. The dashboard shows the most expensive categories, the total spend, and the top three merchants so finance can use it in monthly reporting.

## Key trade-offs made
1. Built a lightweight React frontend instead of a full backend so the app could be live today.
2. Used fixed exchange rates from the assignment instead of real-time rates, which keeps the result reproducible and aligned with the dataset.
3. Kept data in browser memory only to simplify the implementation and deliver the dashboard in the time available.

## Next sprint priorities
1. Add persistence for new expenses so the dashboard keeps data between refreshes and supports real review.
2. Improve input validation and error messages on the add-expense form, so finance can safely enter edge-case values.
3. Add mobile-friendly layout refinements and use clear UX patterns for category filtering.
