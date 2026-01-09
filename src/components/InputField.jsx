export function InputField({ label, hint, value, onChange, placeholder, optional, optionalText }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {optional && <span className="text-slate-400 font-normal text-xs ml-1">({optionalText})</span>}
      </label>
      {hint && <p className="text-xs text-slate-400 mb-2">{hint}</p>}
      <input
        type="number"
        inputMode="decimal"
        step="any"
        min="0"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          // Allow empty string so user can clear and retype
          if (val === '') {
            onChange('');
          } else {
            onChange(parseFloat(val));
          }
        }}
        placeholder={placeholder}
        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      />
    </div>
  );
}

export function SizeButtons({ options, value, onChange, suffix = '' }) {
  // Convert value to number for proper comparison
  const numValue = typeof value === 'string' ? parseInt(value) : value;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-all ${
            numValue === opt ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          {opt}
          {suffix}
        </button>
      ))}
    </div>
  );
}

export function InputWithButtons({ label, options, value, onChange, suffix = '' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <SizeButtons options={options} value={value} onChange={onChange} suffix={suffix} />
      <input
        type="number"
        inputMode="numeric"
        min="1"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          // Allow empty string so user can clear and retype
          if (val === '') {
            onChange('');
          } else {
            onChange(parseInt(val));
          }
        }}
        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      />
    </div>
  );
}
