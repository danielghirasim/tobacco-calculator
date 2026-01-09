import { currencies, flags } from '../translations';

export function Header({ lang, setLang, currency, setCurrency, t }) {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{t('title')}</h1>
          <p className="text-slate-500 text-sm mt-1">{t('subtitle')}</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all"
          >
            {Object.entries(currencies).map(([code, { symbol }]) => (
              <option key={code} value={code}>
                {code} ({symbol})
              </option>
            ))}
          </select>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            {Object.entries(flags).map(([code, flag]) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`text-lg px-2 py-1 rounded transition-all ${
                  lang === code ? 'bg-blue-100' : 'hover:bg-slate-50 opacity-50 hover:opacity-100'
                }`}
                title={code.toUpperCase()}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
