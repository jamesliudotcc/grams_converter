import { useState } from "react";
import Select from "react-select";
import conversions from "../conversions.json";
import "./Row.css";

interface RowProp {
  scale: number;
}

interface Unit {
  label: string;
  value: number;
}
interface Conversion {
  value: number;
  label: string;
}
type Input = string | number | null;

const UNITS: Unit[] = [
  { label: "Cup", value: 1 },
  { label: "Ounce", value: 8 },
  { label: "Tbsp", value: 16 },
  { label: "Tsp", value: 48 },
];

const convert: (input: Input, unit: Unit, conversion: Conversion, scale: number) => string = (
  input: Input,
  unit: Unit,
  conversion: Conversion,
  scale: number,
) => {
  const _input = Number(input || 0);
  const conversionValue = conversion?.value || 0;

  return (scale * (_input) * (conversionValue) / (unit?.value || 1)).toFixed(1);
};

function Row(props: RowProp) {
  const scale = props.scale ? props.scale : 1;

  const defaultUnit = UNITS[0];
  const defaultConversion = conversions[0];

  const [inputValue, setInputValue] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(defaultUnit);
  const [selectedConversion, setSelectedConversion] = useState(defaultConversion);

  const handleInputValueChange = (e: any) => {
    const inputValue = Number(e.target.value);
    setInputValue(inputValue);
  };
  return (
    <article>
      <input
        type="number"
        onChange={handleInputValueChange}
      />
      <Select
        value={selectedUnit}
        onChange={s => s ? setSelectedUnit(s) : setSelectedUnit(defaultUnit)}
        options={UNITS}
      />
      <Select
        value={selectedConversion}
        onChange={s => s ? setSelectedConversion(s) : setSelectedConversion(defaultConversion)}
        options={conversions}
      />
      <div className="result">
        <p>
          {convert(inputValue, selectedUnit, selectedConversion, scale)} g
        </p>
      </div>
    </article>
  );
}

export default Row;
