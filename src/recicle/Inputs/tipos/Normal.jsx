const InputNormal = (props) => {
  const { label, name, value, setForm, ...rest } = props; // Desestructuramos setForm y lo excluimos de props pasados al input

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex flex-col mx-3 F h-20">
      <label className="text-base font-medium text-gray-700">{label}</label>
      <input
        className="mt-1 px-3 py-2 border min-w-56 !text-base rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={label}
        name={name}
        value={value || ""}
        onChange={handleChange} // Usamos onChange para actualizar el estado
        {...rest} // Pasamos los demás props restantes
      />
    </div>
  );
};


export default InputNormal;