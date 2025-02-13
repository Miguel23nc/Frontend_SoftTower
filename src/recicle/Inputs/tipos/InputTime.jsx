import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../stilos.css";
import { TimePicker } from "@mui/x-date-pickers";
const InputTime = ({
  label,
  setForm,
  value,
  name,
  errorOnclick,
  ...otrasProps
}) => {
  const [fecha, setFecha] = useState(null);
  const [error, setError] = useState(false);
  const [animation, setAnimation] = useState(false);

  // En tu componente
  console.log("value", value);

  const parsedValue = value ? dayjs(value, "hh:mm A") : null;

  const styleError = "border-red-500 animate-shake";
  const styleNormal = "border-gray-300";
  const estiloInput = `bg-white h-10 w-60  ${
    animation ? styleError : styleNormal
  }`;

  // Controlar el error y animación en base al prop errorOnclick
  useEffect(() => {
    if (errorOnclick) {
      setAnimation(true);
      setError(true);
    } else {
      setAnimation(false);
      setError(false);
    }
  }, [errorOnclick]);

  useEffect(() => {
    if (fecha) {
      setForm((prevData) => ({
        ...prevData,
        [name]: fecha.format("hh:mm A"),
      }));
      setError(false);
      setAnimation(false);
    }
  }, [fecha, setForm, name]);

  const handleBlur = () => {
    if (!fecha) {
      setError(true);
      setAnimation(true);
    }
  };
  console.log("fecha", fecha);

  return (
    <div className="flex flex-col mx-3 h-20">
      <label
        className={`text-base font-medium ${
          error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <TimePicker
            onBlur={handleBlur}
            className={estiloInput}
            value={fecha || parsedValue}
            onChange={(newData) => setFecha(newData)}
            {...otrasProps}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default InputTime;
