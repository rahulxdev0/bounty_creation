import { useState } from 'react';

export default function FileUpload({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false,
  error,
  disabled = false,
  accept = 'image/*',
  placeholder = 'Choose file or enter URL'
}) {
  const [inputType, setInputType] = useState('file');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setInputType('file')}
          className={`px-3 py-1 text-sm rounded ${
            inputType === 'file' 
              ? 'bg-gray-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setInputType('url')}
          className={`px-3 py-1 text-sm rounded ${
            inputType === 'url' 
              ? 'bg-gray-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Enter URL
        </button>
      </div>

      {inputType === 'file' ? (
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      ) : (
        <input
          type="url"
          id={name}
          name={name}
          value={typeof value === 'string' ? value : ''}
          onChange={handleUrlChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      )}

      {value && (
        <div className="mt-2">
          <img 
            src={value} 
            alt="Preview" 
            className="h-20 w-20 object-cover rounded border border-gray-300"
          />
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
