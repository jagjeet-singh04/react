import Hello from "./hello"
function App() {
  
const username = "hello world"
  return (

    <> // this is called fragment in this it is like a div
      <Hello/>
      <p> hello this is paragraph , ~{username}~ using curly braces </p>
      <h4> this is H4 </h4>
      <h4> function name should always be starting in capital letter</h4>
    </>
  )
}

export default App
