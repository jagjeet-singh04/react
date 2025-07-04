
import './App.css'
import { useState } from 'react';

function App() {

  // let counter = 5 ; 
  // isko joh upr likha h usse apn react me esse likhte h 
  // this comes under hooks like it contains usestate , useeffect etc 
  let [counter , setCounter] = useState(15) 
  
  const addValue = ()=>{
    if ( counter >= 20 )
    {
      counter = 20 
    }
    else 
    setCounter(counter+1) ; 
  }

  const decreaseValue = () =>{
    if ( counter <= 0 )
    {
      counter = 0 ; 
    }
    else 
    setCounter(counter-1) ; 
  }

  return (
    <>
      <h1>React Tutorial</h1>
      <h2>Counter value: {counter}</h2>
      <button
      onClick={addValue}> Add Value {counter}</button>
      <br />
      <button onClick={decreaseValue}> Decrease Value {counter}</button>
      <p> value of counter is {counter}</p>
    </>
  )
}

export default App
