export function ReferenceSection({ t }) {
  const tubeData = [
    ['King Size', '84mm'],
    ["100's", '100mm'],
    ['Slim', '84mm'],
    ['Regular', '70mm'],
  ];

  const tobaccoData = [
    [t('slim'), '0.5-0.6g'],
    [t('standard'), '0.7-0.8g'],
    [t('full'), '0.9-1.0g'],
    [t('extraFull'), '1.2-1.5g'],
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">{t('referenceTitle')}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span>🚬</span> {t('tubeSizes')}
          </h3>
          <div className="space-y-1.5">
            {tubeData.map(([name, size]) => (
              <div key={name} className="flex justify-between text-sm">
                <span className="text-blue-700">{name}</span>
                <span className="font-medium text-blue-900">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <span>🍂</span> {t('tobaccoGuide')}
          </h3>
          <div className="space-y-1.5">
            {tobaccoData.map(([name, amount]) => (
              <div key={name} className="flex justify-between text-sm">
                <span className="text-amber-700">{name}</span>
                <span className="font-medium text-amber-900">{amount}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-600">💡 {t('savingTip')}</p>
        </div>
      </div>
    </div>
  );
}
