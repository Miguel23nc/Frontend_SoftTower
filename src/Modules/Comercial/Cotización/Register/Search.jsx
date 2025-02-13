import { Autocomplete, TextField } from "@mui/material";
import "./stilo.css"
const SearchClient = ({ clientSelected, setClientSelected, options }) => {
  const handleChange = (e, n) => {
    setClientSelected(n ? n : "");
  };
  return (
    <div className=" flex ml-20">
      <Autocomplete
        id="client-autocomplete"
        className="w-[35%] mr-5 bg-white"
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Cliente" variant="outlined" />
        )}
      />
      <Autocomplete
        id="ruc-autocomplete"
        className="w-[35%] ml-5 bg-white"
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.ruc}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="RUC" variant="outlined" />
        )}
      />
    </div>
  );
};

export default SearchClient;
