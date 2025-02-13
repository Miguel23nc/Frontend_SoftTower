import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Password } from "primereact/password";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Inputs/stilos.css";
const Input = (props) => {
  const {
    label,
    type,
    name,
    value,
    onChange,
    error,
    options,
    width,
    optionLabel,
  } = props;
  const [animation, setAnimation] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  let estilo = `mt-1 w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
    animation ? "border-red-500 animate-shake " : "border-gray-300"
  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`;
  useEffect(() => {
    if (value) {
      setAnimation(false);
    }
  }, [error]);
  const handleBur = (e) => {
    if (error) {
      setAnimation(true);
      setErrorMesage(error);
    }
    const { value } = e.target;
    if (!value) {
      setAnimation(true);
      setErrorMesage(error);
    }
  };
  let content = null;
  switch (type) {
    case "password":
      content = (
        <Password
          value={value}
          onChange={onChange}
          onBlur={handleBur}
          name="password"
          placeholder={label}
          toggleMask
          inputClassName={estilo}
          feedback={false}
        />
      );
      break;
    case "multiSelect":
      content = (
        <MultiSelect
          value={value}
          onChange={onChange}
          options={options}
          display="chip"
          placeholder="Permisos"
          maxSelectedLabels={2}
          className={`border !mt-0 !px-0 !py-0 
            !text-base rounded-lg min-w-[250px] ${estilo}`}
        />
      );
      break;
    case "select":
      content = (
        <Dropdown
          value={value}
          onChange={onChange}
          options={options}
          optionLabel={optionLabel ? optionLabel : "name"}
          editable
          placeholder={label}
          panelClassName="mt-2"
          className={` rounded-lg !mt-0 !text-base ${estilo}`}
          {...props}
        />
      );
      break;
    case "phoneCode":
      content = (
        <PhoneInput
          onChange={onChange}
          className="phone-input-hidden-number rounded-md w-[120px] px-2"
          international
          countryCallingCodeEditable={false}
          defaultCountry="PE"
          value={value}
        />
      );
      break;
    default:
      content = (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={errorMesage ? error : label}
          onChange={onChange}
          onBlur={handleBur}
          {...props}
          className={estilo}
        />
      );
      break;
  }
  return (
    <div
      onBlur={error ? handleBur : null}
      className={`flex flex-col ${
        width ? width : "min-w-60  ml-8"
      } mr-2 relative  h-20 justify-center `}
    >
      <label className="text-base font-medium text-gray-700">{label}</label>
      {content}
      {animation && <div className="  text-red-500 text-xs">{errorMesage}</div>}
    </div>
  );
};

export default Input;
