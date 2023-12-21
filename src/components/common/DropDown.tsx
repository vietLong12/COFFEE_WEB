import { InputLabel, MenuItem, Select } from "@mui/material";

interface ValueProps {
  value: string;
  code: string;
}

interface DropDownProps {
  label: string;
  setValue: (data: any) => void;
  value: ValueProps[];
  dataSelected: string;
}

const DropDown = ({ label, value, setValue, dataSelected }: DropDownProps) => {
  return (
    <div className="dropdown-custom">
      <InputLabel color="primary" id="demo-simple-select-helper-label">
        {label}
      </InputLabel>
      <Select
        className="w-full"
        value={dataSelected}
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
      >
        {value.map((item, index) => {
          return (
            <MenuItem key={index} value={item.code}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DropDown;
