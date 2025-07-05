import { useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let myObj = {
    name: "hello", 
    age: 21
  }

  return (
    <>
     <h1 className='bg-amber-100 text-black rounded-2xl p-4'>Tailwind Test</h1>
     {/* the below given are the props which we are givning we cannot pass array and obj but we can create obj or arr and then we can pass it  */}
     <Card learn= "reaact" someObj ={myObj} insideTxt = "This is react Tutorial" />

    {/* here below we have not passed the insideTxt but in the code we have handeled it using '||' in which we have simply written React so below will give react   */}
{/* or we can give it in the starting like '=' will treat as default value  */}
     <Card learn = "Tutorial and practise"  />
     
    </>
  )
}

export default App
