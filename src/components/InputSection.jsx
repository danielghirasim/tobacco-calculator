import { InputField, InputWithButtons } from './InputField';
import { packSizeOptions, tobaccoSizeOptions, tubesCountOptions, currencies } from '../translations';

export function InputSection({ formData, handleChange, calculate, handleReset, t, currency }) {
  const currSymbol = currencies[currency].symbol;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-5">{t('inputTitle')}</h2>

      <div className="space-y-5">
        <InputField
          label={`${t('packPrice')} (${currSymbol})`}
          value={formData.packPrice}
          onChange={(v) => handleChange('packPrice', v)}
          placeholder="8.00"
        />

        <InputWithButtons
          label={t('cigsPerPack')}
          options={packSizeOptions}
          value={formData.packSize}
          onChange={(v) => handleChange('packSize', v)}
        />

        <div className="border-t border-slate-100 pt-5">
          <InputField
            label={`${t('tobaccoPrice')} (${currSymbol})`}
            value={formData.tobaccoPackPrice}
            onChange={(v) => handleChange('tobaccoPackPrice', v)}
            placeholder="15.00"
          />
        </div>

        <InputWithButtons
          label={t('tobaccoSize')}
          options={tobaccoSizeOptions}
          value={formData.tobaccoPackSize}
          onChange={(v) => handleChange('tobaccoPackSize', v)}
          suffix="g"
        />

        <InputField
          label={t('tobaccoPerCig')}
          hint={t('tobaccoHint')}
          value={formData.tobaccoPerCig}
          onChange={(v) => handleChange('tobaccoPerCig', v)}
          placeholder="0.8"
        />

        <div className="border-t border-slate-100 pt-5">
          <InputField
            label={`${t('tubesPrice')} (${currSymbol})`}
            value={formData.tubesPackPrice}
            onChange={(v) => handleChange('tubesPackPrice', v)}
            placeholder="3.50"
          />
        </div>

        <InputWithButtons
          label={t('tubesCount')}
          options={tubesCountOptions}
          value={formData.tubesCount}
          onChange={(v) => handleChange('tubesCount', v)}
        />

        <div className="border-t border-slate-100 pt-5">
          <InputField
            label={`${t('otherCosts')} (${currSymbol})`}
            hint={t('otherCostsHint')}
            value={formData.otherCosts}
            onChange={(v) => handleChange('otherCosts', v)}
            placeholder="0"
            optional
            optionalText={t('optional')}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold py-3.5 px-5 rounded-xl transition-all"
          >
            {t('calculate')}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
            title={t('reset')}
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
}
