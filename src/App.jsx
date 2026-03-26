import { useState,useCallback,useEffect , useRef} from "react";


function App() {
  const [color, setColor] = useState("green");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*(){}+-_~'";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

// copyClipBoard funtion
const copyPasswordToClipboard = useCallback(() =>{

  // u can read this in documentation
  passwordRef.current?.select(); // it will give you the effect like highliting the selected password in dark blue, so you will get know this password is selected insted of giving alert message
  passwordRef.current?.setSelectionRange(0,100);
  // passwordRef.current?.setSelectionRange(0,3); // you can only copy starting 3 words of password

  window.navigator.clipboard.writeText(password); // it will copie the password to clip board
  // alert("Password is copied on clip board");
},[password]); 

useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div
        className="center rounded-xl" style={{ backgroundColor: color, textAlign: "center", marginTop: "20px"}}>
        <h1 className="text-4xl font-bold underline text-white ">
          Password Generator
        </h1>
      </div>

      
      <div className="w-full max-w-md mx-auto shodow-md rounded-lg px-6 my-10 text-orange-500 bg-gray-700" style={{textAlign:"center", alignItems:"center", height:"80px"}}>
        <h1 className="text-white text-center">Generated Password</h1>
        
        <div className="flex shadow rounded-lg overflow-hidden mb-4" style={{backgroundColor:"white"}}>
          {/* Input filed */}
          <input type="text" name="password" id="password" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={passwordRef}/>
          {/* button here */}
          <button  onClick={copyPasswordToClipboard} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" style={{cursor:"pointer"}}>
            copy
          </button>
        </div>
{/* ___________________________________________________________________________________________________________________________________ */}
        <div className="felx text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min="6" max="20" value={length} onChange={(e) => setLength(e.target.value)} className="cursorPointer" />
          <span className="text-sm text-gray-500">Length : {length}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="numberAllowed" checked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
          <label htmlFor="numberAllowed" className="text-sm text-gray-500">Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" id="charAllowed" checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
          <label htmlFor="charAllowed" className="text-sm text-gray-500">Include Special Characters</label>
        </div>

        <button onClick={passwordGenerator} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
          Generate Password
        </button>
        
      </div>
      
      </div>
    </>
  );
}

export default App;
