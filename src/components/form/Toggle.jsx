export default function Toggle({ 
  label, 
  name, 
  checked, 
  onChange, 
  disabled = false,
  description = '' 
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          id={name}
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
            checked ? 'bg-gray-600' : 'bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
