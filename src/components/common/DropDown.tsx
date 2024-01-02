import { InputLabel, MenuItem, Select } from "@mui/material";

interface ValueProps {
  name: string;
  code: string;
}

interface DropDownProps {
  label: string;
  setValue: (data: any) => void;
  value: ValueProps[];
  dataSelected: string | undefined | number;
}

const DropDown = ({ label, value, setValue, dataSelected }: DropDownProps) => {
  console.log("value: ", value);

  return (
    <div className="dropdown-custom">
      <InputLabel color="primary" id="demo-simple-select-helper-label">
        {label}
      </InputLabel>
      <Select
        className="w-full"
        defaultValue={""}
        value={dataSelected ? dataSelected : ""}
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
      >
        {value.map((item, index) => {
          return (
            <MenuItem key={index} value={item.code}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DropDown;
