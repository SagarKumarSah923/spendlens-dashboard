# Edge Cases

1. Missing exchange rate
   - What could go wrong: a currency without a rate could cause NaN or app failure.
   - Current handling: rates are treated as 0 if missing or null, so totals remain numeric.
   - Correct behavior: show a validation warning and exclude or flag the expense until a rate is available.

2. Zero or negative amount
   - What could go wrong: totals may become misleading or allow invalid expense entries.
   - Current handling: add-expense rejects amount values that are zero or negative.
   - Correct behavior: prevent submission and show a clear error to the user.

3. Empty merchant or category fields
   - What could go wrong: incomplete records appear in the table.
   - Current handling: form submission returns early without adding an expense.
   - Correct behavior: display field-level validation errors.

4. Large amounts causing overflow
   - What could go wrong: very large values could break formatting or table layout.
   - Current handling: values are formatted with locale separators, but no explicit limit is enforced.
   - Correct behavior: cap input range and use responsive display for large numbers.

5. Filter yields no results
   - What could go wrong: the user sees an empty table without explanation.
   - Current handling: the table shows no rows but no message.
   - Correct behavior: display "No expenses match this category" when filters are active.

6. Special characters in merchant names
   - What could go wrong: display may render unexpectedly if not escaped.
   - Current handling: React safely renders strings, so text is escaped automatically.
   - Correct behavior: continue using safe rendering and support long merchant names.

7. Unsupported currency in form
   - What could go wrong: a new currency could be added without a rate and produce invalid USD values.
   - Current handling: only supported currencies are available in the form.
   - Correct behavior: add new currencies to both rate lookup and dropdown options when supported.

8. Narrow mobile screens
   - What could go wrong: the table becomes hard to read on phones.
   - Current handling: responsive styles convert table rows into cards on narrow screens.
   - Correct behavior: ensure all table data remains legible and controls stay accessible.
