import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { EXPENSES, RATES, CurrencyCode, categories, currencies } from './data';
import './App.css';

interface ExpenseRow {
  id: number;
  date: string;
  merchant: string;
  amount: number;
  currency: CurrencyCode;
  category: string;
}

type SortField = 'date' | 'usd';
type SortDirection = 'asc' | 'desc';

const toUSD = (amount: number, currency: CurrencyCode, customEURRate?: number) => {
  const rate = currency === 'EUR' && customEURRate !== undefined ? customEURRate : RATES[currency];
  return rate === undefined || rate === null ? 0 : Number((amount / rate).toFixed(2));
};

const formatMoney = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function App() {
  const [expenses, setExpenses] = useState<ExpenseRow[]>([...EXPENSES]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [form, setForm] = useState({ merchant: '', amount: '', currency: 'USD', category: 'Travel', date: dayjs().format('YYYY-MM-DD') });
  const [customEURRate, setCustomEURRate] = useState<number>(RATES.EUR);

  const filteredExpenses = useMemo(() => {
    return selectedCategory
      ? expenses.filter((expense) => expense.category === selectedCategory)
      : expenses;
  }, [expenses, selectedCategory]);

  const expenseWithUsd = useMemo(() => {
    return filteredExpenses.map((expense) => ({
      ...expense,
      usd: toUSD(expense.amount, expense.currency as CurrencyCode, customEURRate),
    }));
  }, [filteredExpenses, customEURRate]);

  const sortedExpenses = useMemo(() => {
    return [...expenseWithUsd].sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc'
          ? dayjs(a.date).diff(dayjs(b.date))
          : dayjs(b.date).diff(dayjs(a.date));
      }
      return sortDirection === 'asc' ? a.usd - b.usd : b.usd - a.usd;
    });
  }, [expenseWithUsd, sortField, sortDirection]);

  const summaryByCategory = useMemo(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const usd = toUSD(expense.amount, expense.currency as CurrencyCode, customEURRate);
      const group = acc[expense.category] ?? { category: expense.category, count: 0, total: 0, largest: 0 };
      group.count += 1;
      group.total += usd;
      group.largest = Math.max(group.largest, usd);
      acc[expense.category] = group;
      return acc;
    }, {} as Record<string, { category: string; count: number; total: number; largest: number }>);

    return Object.values(grouped)
      .map((row) => ({
        ...row,
        total: Number(row.total.toFixed(2)),
        largest: Number(row.largest.toFixed(2)),
      }))
      .sort((a, b) => b.total - a.total);
  }, [expenses, customEURRate]);

  const overallTotal = useMemo(() => {
    return formatMoney(
      expenses.reduce((sum, expense) => sum + toUSD(expense.amount, expense.currency as CurrencyCode, customEURRate), 0),
    );
  }, [expenses, customEURRate]);

  const topMerchants = useMemo(() => {
    const totals = expenses.reduce((acc, expense) => {
      const usd = toUSD(expense.amount, expense.currency as CurrencyCode, customEURRate);
      acc[expense.merchant] = (acc[expense.merchant] ?? 0) + usd;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(totals)
      .map(([merchant, total]) => ({ merchant, total: Number(total.toFixed(2)) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  }, [expenses, customEURRate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.merchant || !form.amount || !form.currency || !form.category || !form.date) {
      return;
    }

    const amountValue = Number(form.amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) return;

    const nextId = Math.max(...expenses.map((expense) => expense.id), 0) + 1;
    setExpenses((current) => [
      ...current,
      {
        id: nextId,
        merchant: form.merchant,
        amount: amountValue,
        currency: form.currency as CurrencyCode,
        category: form.category,
        date: form.date,
      },
    ]);
    setForm({ ...form, merchant: '', amount: '' });
  };

  const selectedNote = selectedCategory ? `${selectedCategory} filter applied` : 'Showing all categories';

  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>Spendlens Expense Dashboard</h1>
          <p>Live summary and trending merchant view for board reporting.</p>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <h2>Category summary</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Transactions</th>
                <th>Total USD</th>
                <th>Largest USD</th>
              </tr>
            </thead>
            <tbody>
              {summaryByCategory.map((row) => (
                <tr key={row.category} className={selectedCategory === row.category ? 'selected-row' : ''} onClick={() => setSelectedCategory(selectedCategory === row.category ? null : row.category)}>
                  <td>{row.category}</td>
                  <td>{row.count}</td>
                  <td>{formatMoney(row.total)}</td>
                  <td>{formatMoney(row.largest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="summary-card">
          <h2>Overall total</h2>
          <div className="big-number">{overallTotal}</div>
          <h2>Top 3 merchants</h2>
          <ol>
            {topMerchants.map((item) => (
              <li key={item.merchant}>
                <strong>{item.merchant}</strong> — {formatMoney(item.total)}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="interactive-row">
        <div className="filter-status">{selectedNote}</div>
        <div className="sort-controls">
          <button type="button" onClick={() => setSortField('date')} className={sortField === 'date' ? 'active' : ''}>Sort by date</button>
          <button type="button" onClick={() => setSortField('usd')} className={sortField === 'usd' ? 'active' : ''}>Sort by USD</button>
          <button type="button" onClick={() => setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'))}>Toggle direction</button>
        </div>
      </section>

      <section className="table-section">
        <h2>Expense table</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Original</th>
              <th>USD equivalent</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{dayjs(expense.date).format('MMM D, YYYY')}</td>
                <td>{expense.merchant}</td>
                <td>{`${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${expense.currency}`}</td>
                <td>{formatMoney(expense.usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="form-section">
        <h2>Add expense</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Merchant
            <input value={form.merchant} onChange={(e) => setForm({ ...form, merchant: e.target.value })} placeholder="e.g. Local coffee" />
          </label>
          <label>
            Amount
            <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="100" />
          </label>
          <label>
            Currency
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </label>
          <button type="submit">Add expense</button>
        </form>
      </section>

      <section className="about-section">
        <h2>How the currency conversion works</h2>
        <p>
          Each expense converts from its original currency to USD using a fixed rate table.
          EUR can be adjusted separately by changing the EUR/USD rate.
          Missing or invalid rate values are treated as zero to keep totals consistent without crashing.
        </p>
      </section>

      <section className="about-section">
        <h2>Notes</h2>
        <p>
          This dashboard supports category filtering, sorting, and adding new expenses immediately in memory.
          It does not persist data after refresh.
        </p>
      </section>
    </div>
  );
}

export default App;
