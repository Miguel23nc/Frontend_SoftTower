import React from "react";

const Select = ({ name, label, value, onChange, options, multiple, error }) => {
  const colors = error
    ? "border-red-500 text-red-900 placeholder-red-300"
    : "border-gray-300";

  return (
    <div className="flex flex-col relative w-60 mx-8 h-20 justify-center items-start">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        className={`block w-full mt-1 px-3 py-2 border 
          rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
           focus:border-indigo-500 sm:text-sm ${colors}`}
      >
        <option value="" disabled>
          Seleccionar
        </option>

        {options &&
          options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
