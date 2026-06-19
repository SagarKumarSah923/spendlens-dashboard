export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'MXN';

export const RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  EUR: 0.9201,
  GBP: 0.7887,
  INR: 83.4700,
  JPY: 153.8200,
  AUD: 1.5312,
  CAD: 1.3641,
  SGD: 1.3478,
  AED: 3.6725,
  MXN: 17.1540,
};

export const categories = ['Travel', 'Software', 'Food', 'Entertainment'];
export const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'SGD', 'AED', 'MXN'];

export const EXPENSES = [
  { id: 1, date: '2026-02-03', merchant: 'Indigo Airlines', amount: 8200, currency: 'INR', category: 'Travel' },
  { id: 2, date: '2026-02-10', merchant: 'Slack Pro', amount: 12.5, currency: 'USD', category: 'Software' },
  { id: 3, date: '2026-02-14', merchant: 'Dishoom London', amount: 68.4, currency: 'GBP', category: 'Food' },
  { id: 4, date: '2026-02-19', merchant: 'AWS', amount: 143.0, currency: 'USD', category: 'Software' },
  { id: 5, date: '2026-02-25', merchant: 'Singapore Taxi', amount: 32.0, currency: 'SGD', category: 'Travel' },
  { id: 6, date: '2026-03-02', merchant: 'Figma', amount: 15.0, currency: 'USD', category: 'Software' },
  { id: 7, date: '2026-03-07', merchant: 'Boulangerie Utopie', amount: 9.8, currency: 'EUR', category: 'Food' },
  { id: 8, date: '2026-03-11', merchant: 'JR Rail Pass', amount: 50000, currency: 'JPY', category: 'Travel' },
  { id: 9, date: '2026-03-15', merchant: 'Netflix', amount: 15.49, currency: 'USD', category: 'Entertainment' },
  { id: 10, date: '2026-03-20', merchant: 'Swiggy', amount: 620, currency: 'INR', category: 'Food' },
  { id: 11, date: '2026-03-28', merchant: 'Air Canada', amount: 410.0, currency: 'CAD', category: 'Travel' },
  { id: 12, date: '2026-04-02', merchant: 'GitHub Copilot', amount: 10.0, currency: 'USD', category: 'Software' },
  { id: 13, date: '2026-04-08', merchant: 'Burj Khalifa tickets', amount: 149.0, currency: 'AED', category: 'Entertainment' },
  { id: 14, date: '2026-04-12', merchant: 'Qantas', amount: 520.0, currency: 'AUD', category: 'Travel' },
  { id: 15, date: '2026-04-15', merchant: 'Linear', amount: 8.0, currency: 'USD', category: 'Software' },
  { id: 16, date: '2026-04-18', merchant: 'Tacos el Califa', amount: 180, currency: 'MXN', category: 'Food' },
  { id: 17, date: '2026-04-22', merchant: 'Spotify', amount: 10.99, currency: 'USD', category: 'Entertainment' },
  { id: 18, date: '2026-04-25', merchant: 'Zoom', amount: 15.99, currency: 'USD', category: 'Software' },
  { id: 19, date: '2026-04-29', merchant: 'Lune Croissanterie', amount: 22.0, currency: 'AUD', category: 'Food' },
  { id: 20, date: '2026-05-01', merchant: 'Emirates flight', amount: 1850, currency: 'AED', category: 'Travel' },
] as const;
