import {useState} from 'react'

function App() {
  const [colour , setcolour] = useState("olive")

  return (
    <>
     <div className='w-full h-screen duration-200' style={{backgroundColor : colour}}>
       <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 '>
        <div className='flex flex-wrap justify justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-3xl'>
          <button onClick={ ()=> setcolour('red') } className='justify justify-center bg-red-500 px-3 py-2 rounded-3xl text-white'>Red</button>
          <button onClick={ ()=> setcolour('blue') } className='justify justify-center bg-blue-500 px-3 py-2 rounded-3xl text-white'>blue</button>
          <button onClick={ ()=> setcolour('green') } className='justify justify-center bg-green-500 px-3 py-2 rounded-3xl text-white'>green</button>
          <button onClick={ ()=> setcolour('orange') } className='justify justify-center bg-orange-500 px-3 text-white py-2 rounded-3xl'>orange</button>
          <button onClick={ ()=> setcolour('purple') } className='justify justify-center bg-purple-500 px-3  text-white py-2 rounded-3xl'>purple</button>
          <button onClick={ ()=> setcolour('yellow') } className='justify justify-center bg-yellow-500 px-3 text-white py-2 rounded-3xl'>yellow</button>
          <button onClick={ ()=> setcolour('white') } className='justify justify-center bg-white px-3 py-2 rounded-3xl'>white</button>
          <button onClick={ ()=> setcolour('black') } className='justify justify-center bg-black px-3 py-2 text-white rounded-3xl'>black</button>
         
        </div>
       </div>
     </div>
    
    </>
  )
}

export default App
