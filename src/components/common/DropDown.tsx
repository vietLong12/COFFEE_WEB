import { useState } from "react";

interface Props {
  options: any[];
  onSelect: (code: Number) => void;
  label: string;
  defaultValue?: Number | null;
}

const Dropdown = ({ defaultValue, options, onSelect, label }: Props) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleSelect = (option: string) => {
    console.log("option: ", option);

    setSelectedOption(Number(option));
    onSelect(Number(option));
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={label} style={{ marginRight: "8px" }}>
        {label}
      </label>
      <select
        id={label}
        className="border py-2 rounded outline-none hover:border-black"
        value={selectedOption}
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
        aria-label={label}
      >
        <option value="" disabled className="text-blue-500">
          -- Vui lòng chọn --
        </option>
        {options?.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
