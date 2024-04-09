/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numbersallow, setNum] = useState(false)
  const [charactersallow, setChar] = useState(true)
  const [password, setPassword] = useState("")
  const passref = useRef(null)
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let set = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numbersallow) set = set + "1234567890"
    if (charactersallow) set = set + "!@#$%&*_?|~"
    console.log(set)
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * set.length + 1)
      pass = pass + set.charAt(char)          //pass=pass+...
    }
    setPassword(pass)
  }, [length, numbersallow, charactersallow, setPassword])

  const passcopy = useCallback(() => {
    passref.current?.select()
    passref.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password)
  }, [password, length])

  useEffect(() => { passwordgenerator() }, [length, numbersallow, charactersallow, passwordgenerator])
  return (
    <>


      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-3 my-8 text-blue-500 bg-gray-800"><h1 className="text-center text-white ">Password Generator</h1> <div className="flex shadow rounded-lg overflow-hidden mb-4"><input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={passref}></input>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={passcopy}>COPY</button>
      </div>
        <div className="flex text-sm gap-x-2"><div className="flex items-center gap-x-1"><input type="range" min={4} max={100} value={length} className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }}></input>
          <label>length:{length}</label>
        </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" checked={numbersallow} id="numberInput" onChange={() => { setNum((prev) => !prev) }}></input>
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" checked={charactersallow} id="characterInput" onChange={() => { setChar((prev) => !prev) }}></input>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
