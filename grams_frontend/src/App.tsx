import { useState } from 'react'
import Select from 'react-select'
import conversions from '../../conversions.json'
import './App.css'

const UNITS = [
    {label: "Cup", value: 1},
    {label: "Ounce", value: 8},
    {label: "Tablespoon", value: 16},
    {label: "Teaspooon", value: 48},
]

const convert = (input, unit, conversion) => {
  return ((input || 0) * (conversion?.value || 0) / (unit?.value || 1)).toFixed(1)
}

function App() {
  const [inputValue, setInputValue] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [selectedConversion, setSelectedConversion] = useState(null)

  const handleInputValueChange = (e: any) => {
    const inputValue = Number(e.target.value)
    setInputValue(e.target.value)
  }

  return (
    <div className="App">
         <input
             type="number"
             onChange={handleInputValueChange}
         />
         <Select
             onChange={setSelectedUnit}
             options={UNITS}
         />
         <Select
             onChange={setSelectedConversion}
             options={conversions}
         />
         {convert(inputValue, selectedUnit, selectedConversion)} g
    </div>
  )
}

export default App
