function BigSavingsCard({ daily, monthly, yearly, percent, isSaving, t }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white ${
        isSaving
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
          : 'bg-gradient-to-br from-red-500 to-rose-600'
      }`}
    >
      <div className={`text-sm font-medium uppercase tracking-wide mb-4 text-center ${isSaving ? 'text-emerald-100' : 'text-red-100'}`}>
        {isSaving ? t('youSave') : t('youLose')}
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-xs uppercase tracking-wide opacity-80 mb-1">{t('daily')}</div>
          <div className="text-xl md:text-2xl font-bold">{daily}</div>
        </div>
        <div className="border-x border-white/20">
          <div className="text-xs uppercase tracking-wide opacity-80 mb-1">{t('monthly')}</div>
          <div className="text-xl md:text-2xl font-bold">{monthly}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide opacity-80 mb-1">{t('yearly')}</div>
          <div className="text-xl md:text-2xl font-bold">{yearly}</div>
        </div>
      </div>

      {percent !== 0 && (
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-white/20">
            {isSaving ? '✓' : '✗'} {Math.abs(percent).toFixed(0)}% {isSaving ? t('cheaper') : t('moreExpensive')}
          </span>
        </div>
      )}
    </div>
  );
}

function ComparisonRow({ icon, label, rolledValue, boughtValue, t }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{icon}</span>
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <div className="text-right">
        <span className="font-bold text-emerald-600">{rolledValue}</span>
        <span className="text-slate-400 mx-2">{t('vs')}</span>
        <span className="font-semibold text-slate-500">{boughtValue}</span>
      </div>
    </div>
  );
}

function DetailCard({ title, rolledLabel, rolledValue, boughtLabel, boughtValue, savingsValue, percent, isSaving, t }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{title}</div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">{rolledLabel}</span>
          <span className="font-semibold text-slate-700">{rolledValue}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-slate-200">
          <span className="text-slate-600">{boughtLabel}</span>
          <span className="font-semibold text-slate-700">{boughtValue}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className={`font-medium ${isSaving ? 'text-emerald-700' : 'text-red-700'}`}>{t('savings')}</span>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isSaving ? 'text-emerald-600' : 'text-red-600'}`}>
              {isSaving ? '+' : '-'}{savingsValue}
            </span>
            {percent !== 0 && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isSaving ? 'text-emerald-600 bg-emerald-100' : 'text-red-600 bg-red-100'
                }`}
              >
                {isSaving ? '-' : '+'}{Math.abs(percent).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultsSection({ results, t, formatCurrency }) {
  if (!results) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-4">💰</div>
        <h3 className="font-semibold text-slate-700 mb-1">{t('resultsTitle')}</h3>
        <p className="text-sm text-slate-400">{t('fillData')}</p>
      </div>
    );
  }

  const isSaving = results.yearlySavings > 0;
  const canMakeText = t('canMake')
    .replace('{count}', results.cigarettesFromTobacco)
    .replace('{size}', results.tobaccoPackSize);

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
      {/* Main Savings - The Hero */}
      <BigSavingsCard
        daily={formatCurrency(Math.abs(results.dailySavings))}
        monthly={formatCurrency(Math.abs(results.monthlySavings))}
        yearly={formatCurrency(Math.abs(results.yearlySavings))}
        percent={results.savingsPercentMonthly}
        isSaving={isSaving}
        t={t}
      />

      {/* Cost comparison */}
      <div className="mt-6 mb-6">
        <ComparisonRow
          icon="📅"
          label={t('daily')}
          rolledValue={formatCurrency(results.rolledPackCost)}
          boughtValue={formatCurrency(results.boughtPackCost)}
          t={t}
        />
        <ComparisonRow
          icon="📆"
          label={t('monthly')}
          rolledValue={formatCurrency(results.rolledPackCost * 30)}
          boughtValue={formatCurrency(results.boughtPackCost * 30)}
          t={t}
        />
      </div>

      {/* Detailed comparisons */}
      <div className="space-y-3">
        <DetailCard
          title={t('perCig')}
          rolledLabel={`🚬 ${t('rolled')}`}
          rolledValue={formatCurrency(results.rolledCigCost)}
          boughtLabel={`🏪 ${t('bought')}`}
          boughtValue={formatCurrency(results.boughtCigCost)}
          savingsValue={formatCurrency(Math.abs(results.savingsPerCig))}
          percent={results.savingsPercentPerCig}
          isSaving={results.savingsPerCig > 0}
          t={t}
        />

        <DetailCard
          title={`${t('perPack')} (${results.packSize})`}
          rolledLabel={`🚬 ${t('rolled')}`}
          rolledValue={formatCurrency(results.rolledPackCost)}
          boughtLabel={`🏪 ${t('bought')}`}
          boughtValue={formatCurrency(results.boughtPackCost)}
          savingsValue={formatCurrency(Math.abs(results.savingsPerPack))}
          percent={results.savingsPercentPerPack}
          isSaving={results.savingsPerPack > 0}
          t={t}
        />
      </div>

      {/* Tobacco info - subtle */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span>🍂</span>
          <span>{canMakeText}</span>
          <span className="text-slate-300">•</span>
          <span>{formatCurrency(results.tobaccoPricePerGram)}/g</span>
        </div>
      </div>
    </div>
  );
}
