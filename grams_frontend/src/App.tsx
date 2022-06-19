import React, { useState } from 'react'
import './App.css'

import Row from './Row'

function App() {
  const [num, setNum] = useState(1);
  const [scale, setScale] = useState(1);

  const incrNum = () => {
    setNum(num + 1);
  };

  const _setScale = (e: any) => {
    setScale(e.target.value)
  }

  return (
    <>
      <h1>Gram Scale Converter</h1>
      {[...Array(num)].map((_, i) => (
        <Row key={i} scale={scale}/>
      ))}
      <button onClick={incrNum}>More</button>
      <h2>Scaling</h2>
      <input type="number" placeholder="1" onChange={_setScale}/>
    </>
  )
}

export default App
