import { useState, useCallback, useEffect , useRef} from 'react';

// basic version

// function App() {
//   const [length, setLength] = useState(8);
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [charAllowed, setCharAllowed] = useState(false);
//   const [password, setPassword] = useState("");

//   // use ref hook for grabbing the content in the text filed of password 
//   const passwordRef = useRef(null)

//   const passwordGenerator = useCallback(() => {
//     let pass = "";
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     if (numberAllowed) str += "0123456789";
//     if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length);
//       pass += str.charAt(char);
//     }
//     setPassword(pass);
//   }, [length, numberAllowed, charAllowed, setPassword]);

//   const copyPasswordToClipboard = useCallback(()=>{
//     passwordRef.current?.select()
//     passwordRef.current?.setSelectionRange(0,101)
//     window.navigator.clipboard.writeText(password) ; 
//   } ,[password])

//   useEffect(() => {
//     passwordGenerator();
//   }, [length, numberAllowed, charAllowed, passwordGenerator]);

//   return (
//     <>
//       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-8 my-10 bg-gray-800 text-orange-500'>
//         <h1 className='text-center text-white text-2xl font-semibold mb-6'>Password Generator</h1>
//         <div className='flex shadow rounded-lg overflow-hidden mb-6 bg-gray-700'>
//           <input
//             type="text"
//             value={password}
//             className='outline-none w-full py-3 px-4 text-white border-r border-gray-600'
//             placeholder='password'
//             readOnly
//             ref={passwordRef}
//           />
//           <button
//             onClick = {copyPasswordToClipboard}
//             className='bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 transition-colors duration-200 shrink-0'
//           >
//             Copy
//           </button>
//         </div>
//         <div className='flex flex-col gap-y-4 text-sm'>
//           <div className='flex items-center gap-x-2'>
//             <input
//               type="range"
//               min={6}
//               max={100}
//               value={length}
//               className='cursor-pointer w-full'
//               onChange={(e) => setLength(e.target.value)}
//             />
//             <label className='text-white'>Length: {length}</label>
//           </div>
//           <div className='flex items-center gap-x-2'>
//             <input
//               type="checkbox"
//               checked={numberAllowed}
//               id="numberInput"
//               onChange={() => setNumberAllowed((prev) => !prev)}
//             />
//             <label htmlFor="numberInput" className='text-white'>Include Numbers</label>
//           </div>
//           <div className='flex items-center gap-x-2'>
//             <input
//               type="checkbox"
//               checked={charAllowed}
//               id="characterInput"
//               onChange={() => setCharAllowed((prev) => !prev)}
//             />
//             <label htmlFor="characterInput" className='text-white'>Include Special Characters</label>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// Advanced Version


function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    
    // Calculate password strength
    calculateStrength(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const calculateStrength = (pass) => {
    let score = 0;
    
    // Length contributes up to 50% of the score
    score += Math.min(50, (pass.length / 20) * 50);
    
    // Add points for character variety
    if (/[A-Z]/.test(pass)) score += 10;
    if (/[a-z]/.test(pass)) score += 10;
    if (/[0-9]/.test(pass)) score += 10;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;
    
    // Determine strength level
    if (score < 50) setStrength("Weak");
    else if (score < 80) setStrength("Medium");
    else setStrength("Strong");
  };

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
    
    // Show copied feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Secure Password Generator
            </h1>
            <p className="text-gray-400 mt-2">
              Create strong, random passwords instantly
            </p>
          </div>
          
          {/* Password Output */}
          <div className="flex shadow-lg rounded-xl overflow-hidden mb-6 bg-gray-800 border border-gray-700 transition-all duration-300 hover:border-cyan-500">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-4 px-4 text-white bg-transparent font-mono tracking-wider"
              placeholder="Generating password..."
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className={`bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-3 shrink-0 transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden ${
                copied ? "bg-green-600" : ""
              }`}
            >
              {copied ? (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy
                </span>
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Password Strength:</span>
              <span className={`font-medium ${
                strength === "Weak" ? "text-red-400" : 
                strength === "Medium" ? "text-yellow-400" : "text-green-400"
              }`}>
                {strength}
              </span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  strength === "Weak" ? "bg-red-500 w-1/3" : 
                  strength === "Medium" ? "bg-yellow-500 w-2/3" : "bg-green-500 w-full"
                }`}
              ></div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="space-y-6">
            {/* Length Slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <label className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  Password Length
                </label>
                <span className="bg-gray-700 rounded-full px-3 py-1 text-white font-bold">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={30}
                value={length}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>6</span>
                <span>30</span>
              </div>
            </div>
            
            {/* Checkbox Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  id="numberInput"
                  className="h-5 w-5 rounded-md bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800 cursor-pointer"
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                <label htmlFor="numberInput" className="ml-3 text-gray-300 cursor-pointer select-none">
                  Include Numbers
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  id="characterInput"
                  className="h-5 w-5 rounded-md bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800 cursor-pointer"
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                <label htmlFor="characterInput" className="ml-3 text-gray-300 cursor-pointer select-none">
                  Include Special Characters
                </label>
              </div>
            </div>
            
            {/* Generate Button */}
            <button
              onClick={passwordGenerator}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-lg hover:from-cyan-500 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Generate New Password
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-800/50 border-t border-gray-700 py-4 px-8 text-center text-sm text-gray-500">
          <p>For your security, passwords are generated locally and never leave your device.</p>
        </div>
      </div>
      
      <div className="mt-8 text-gray-500 text-sm text-center">
        <p>Created with React • Modern UI Design</p>
      </div>
    </div>
  );
}

export default App;