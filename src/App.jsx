import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { translations, currencies, defaultFormData } from './translations';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { ReferenceSection } from './components/ReferenceSection';

function App() {
  const resultsRef = useRef(null);

  const detectDefaults = () => {
    const locale = navigator.language || 'en-US';
    const langCode = locale.split('-')[0];
    const countryCode = locale.split('-')[1] || '';

    const detectedLang = translations[langCode] ? langCode : 'en';

    const currencyMap = {
      RO: 'RON',
      PL: 'PLN',
      CZ: 'CZK',
      HU: 'HUF',
      BG: 'BGN',
      GB: 'GBP',
      DE: 'EUR',
      FR: 'EUR',
      ES: 'EUR',
      IT: 'EUR',
      AT: 'EUR',
      US: 'USD',
    };
    const detectedCurrency = currencyMap[countryCode] || 'EUR';

    return { detectedLang, detectedCurrency };
  };

  const { detectedLang, detectedCurrency } = detectDefaults();

  const [lang, setLang] = useLocalStorage('calc_lang', detectedLang);
  const [currency, setCurrency] = useLocalStorage('calc_currency', detectedCurrency);
  const [formData, setFormData] = useLocalStorage('calc_data', defaultFormData);
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key] || key, [lang]);

  const formatCurrency = useCallback(
    (value) => {
      const curr = currencies[currency];
      const formatted = value.toFixed(2);
      if (currency === 'RON') {
        return `${formatted} ${curr.symbol}`;
      }
      return `${curr.symbol}${formatted}`;
    },
    [currency]
  );

  const calculate = useCallback(
    (shouldScroll = true) => {
      const { packPrice, packSize, tobaccoPackPrice, tobaccoPackSize, tobaccoPerCig, tubesPackPrice, tubesCount, otherCosts } = formData;

      if (!packPrice || !tobaccoPackPrice || !tobaccoPackSize || !tubesPackPrice || !tubesCount) {
        setResults(null);
        return;
      }

      const tobaccoPricePerGram = tobaccoPackPrice / tobaccoPackSize;
      const tubePrice = tubesPackPrice / tubesCount;
      const cigarettesFromTobacco = Math.floor(tobaccoPackSize / tobaccoPerCig);

      const tobaccoCostPerCig = tobaccoPricePerGram * tobaccoPerCig;
      const rolledCigCost = tobaccoCostPerCig + tubePrice;
      const rolledPackCost = rolledCigCost * packSize;

      const boughtCigCost = packPrice / packSize;
      const boughtPackCost = parseFloat(packPrice);

      const savingsPerCig = boughtCigCost - rolledCigCost;
      const savingsPerPack = boughtPackCost - rolledPackCost;

      const packsPerMonth = 30;
      const monthlyRolledCost = rolledPackCost * packsPerMonth + (parseFloat(otherCosts) || 0);
      const monthlyBoughtCost = boughtPackCost * packsPerMonth;
      const monthlySavings = monthlyBoughtCost - monthlyRolledCost;

      const dailySavings = savingsPerPack;
      const yearlySavings = monthlySavings * 12;

      const savingsPercentPerCig = boughtCigCost > 0 ? (savingsPerCig / boughtCigCost) * 100 : 0;
      const savingsPercentPerPack = boughtPackCost > 0 ? (savingsPerPack / boughtPackCost) * 100 : 0;
      const savingsPercentMonthly = monthlyBoughtCost > 0 ? (monthlySavings / monthlyBoughtCost) * 100 : 0;

      setResults({
        rolledCigCost,
        boughtCigCost,
        savingsPerCig,
        savingsPercentPerCig,
        rolledPackCost,
        boughtPackCost,
        savingsPerPack,
        savingsPercentPerPack,
        dailySavings,
        monthlySavings,
        savingsPercentMonthly,
        yearlySavings,
        cigarettesFromTobacco,
        tobaccoPackSize,
        tobaccoPricePerGram,
        packSize,
      });
      setHasCalculated(true);

      if (shouldScroll && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    },
    [formData]
  );

  useEffect(() => {
    if (hasCalculated) {
      const timer = setTimeout(() => calculate(false), 200);
      return () => clearTimeout(timer);
    }
  }, [formData, hasCalculated, calculate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(defaultFormData);
    setResults(null);
    setHasCalculated(false);
  };

  return (
    <div className="min-h-screen py-6 px-4 md:py-8 md:px-6">
      <div className="max-w-5xl mx-auto">
        <Header lang={lang} setLang={setLang} currency={currency} setCurrency={setCurrency} t={t} />

        <div className="grid gap-5 grid-cols-1 lg:grid-cols-[380px_1fr]">
          <div>
            <InputSection formData={formData} handleChange={handleChange} calculate={() => calculate(true)} handleReset={handleReset} t={t} currency={currency} />
          </div>

          <div className="space-y-5">
            <div ref={resultsRef}>
              <ResultsSection results={results} t={t} formatCurrency={formatCurrency} />
            </div>
            <ReferenceSection t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
