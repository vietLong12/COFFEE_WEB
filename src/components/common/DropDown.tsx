import { useEffect, useState } from "react";

interface Props {
  options: any[];
  onSelect: (code: Number) => void;
  label: string;
  defaultValue?: Number | null;
  disabled?: boolean;
}

const Dropdown = ({
  defaultValue,
  options,
  onSelect,
  label,
  disabled,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<any>(defaultValue);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-col">
      <label htmlFor={label} style={{ marginRight: "8px" }}>
        {label}
      </label>
      <select
        disabled={disabled || false}
        id={label}
        className="border py-2 rounded outline-none hover:border-black"
        value={selectedOption ? selectedOption : 0}
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
        aria-label={label}
      >
        <option value="emty" className="text-blue-500">
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
