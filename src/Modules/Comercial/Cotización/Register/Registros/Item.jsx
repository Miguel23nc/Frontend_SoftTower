import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { validateItem } from "../../validateCotizacion";
import Input from "../../../../../recicle/Inputs/Inputs";

const example = [
  {
    name: "John Doe John John DoeJohn DoeJhn DoeJohn DoeJohn DoeDoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe",
    ruc: "123456789",
  },
  {
    name: "Lorem ipsum leniti inventovel fuga rem praesentium. Dolorum?",
    ruc: "987654321",
  },
  {
    name: "Lorem ipliae quidem vel fuga rem praesentium. Dolorum?",
    ruc: "987654323",
  },
  {
    name: "Lorem ipsum dconsequatur conseqga rem praesentium. Dolorum?",
    ruc: "987654321",
  },
  {
    name: "Lorem ipnsequuntur quae quidem vel fuga rem praesentium. Dolorum?",
    ruc: "987654321",
  },
  {
    name: "Lorem ipsum dolor, ti inventore laudantium o. Dolorum?",
    ruc: "987654321",
  },
  {
    name: "Lorem ipsum dniti inventore laaesentium. Dolorum?",
    ruc: "987654321",
  },
];
const Item = (props) => {
  const { set, setErrorForm, initialData, wrap } = props;
  const [form, setForm] = useState({
    service: initialData.service || "",
    typeService: initialData.typeService || "",
    typeWaste: initialData.typeWaste || "",
    measure: initialData.measure || "",
    quantity: initialData.quantity || 0,
    priceWithoutIGV: initialData.priceWithoutIGV || 0,
    priceWithIGV: initialData.priceWithIGV || 0,
    subTotal: initialData.subTotal || 0,
  });

  const limitDecimals = (value, decimals = 8) => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  };

  const validate = validateItem(form);
  useEffect(() => {
    if (Object.keys(validate).length > 0) {
      setErrorForm((prevData) => ({
        ...prevData,
        registros: true,
      }));
    } else {
      setErrorForm((prevData) => ({
        ...prevData,
        registros: false,
      }));
    }
  }, [Object.keys(validate).length]);

  useEffect(() => {
    if (Object.keys(validate).length === 0) {
      set({
        ...form,
        service: form.service.name || form.service,
        typeService: form.typeService.name || form.typeService,
        typeWaste: form.typeWaste.name || form.typeWaste,
        measure: form.measure.name || form.measure,
        priceWithoutIGV: parseFloat(form.priceWithoutIGV),
        priceWithIGV: parseFloat(form.priceWithIGV),
        subTotal: parseFloat(form.subTotal),
      });
    }
  }, [form]);
  const handlePrice = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (name === "quantity") {
      setForm((prevData) => ({
        ...prevData,
        quantity: Number(value),
        subTotal: limitDecimals(numericValue * form.priceWithoutIGV),
      }));
    } else if (name === "priceWithoutIGV") {
      setForm((prevData) => ({
        ...prevData,
        priceWithoutIGV: value,
        priceWithIGV: limitDecimals(numericValue * 1.18),
        subTotal: limitDecimals(form.quantity * numericValue),
      }));
    } else if (name === "priceWithIGV") {
      setForm((prevData) => ({
        ...prevData,
        priceWithIGV: value,
        priceWithoutIGV: limitDecimals(numericValue / 1.18),
        subTotal: form.quantity * form.priceWithoutIGV,
      }));
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (value.name) {
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <div className={` ${wrap} flex flex-wrap  my-3 `}>
      <Input
        label="Servicio"
        type="select"
        name="service"
        value={form.service}
        onChange={handleForm}
        options={example}
        width="min-w-[300px] ml-3"
        error={validate.service}
      />
      <Input
        label="Tipo de Servicio"
        type="select"
        name="typeService"
        value={form.typeService}
        onChange={handleForm}
        options={example}
        width="min-w-40 ml-3"
        error={validate.typeService}
      />
      <Input
        label="Tipo de Residuo"
        type="select"
        name="typeWaste"
        value={form.typeWaste}
        onChange={handleForm}
        options={example}
        width="min-w-40 ml-3"
        error={validate.typeWaste}
      />
      <Input
        label="Unidad de Medida"
        type="select"
        name="measure"
        value={form.measure}
        onChange={handleForm}
        options={example}
        width="min-w-40 ml-3"
        error={validate.measure}
      />

      <Input
        onChange={handlePrice}
        name="quantity"
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.quantity}
        label="Cantidad"
        width="min-w-16 mx-3 ml-3"
        error={validate.quantity}
      />
      <Input
        onChange={handlePrice}
        name="priceWithoutIGV"
        onKeyPress={(e) => {
          if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.priceWithoutIGV === 0 ? "" : form.priceWithoutIGV}
        label="Precio S/ IGV"
        width="min-w-28 mx-3"
        error={validate.priceWithoutIGV}
      />
      <Input
        onChange={handlePrice}
        name="priceWithIGV"
        onKeyPress={(e) => {
          if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={form.priceWithIGV}
        label="Precio C/ IGV"
        width="min-w-36 mx-3"
        error={validate.priceWithIGV}
      />
      <Input
        onChange={handlePrice}
        name="subTotal"
        value={form.subTotal}
        label="subTotal"
        width="min-w-40 mx-3"
        disabled
        error={validate.subTotal}
      />
    </div>
  );
};

export default Item;
