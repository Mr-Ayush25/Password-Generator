// import { useState } from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import banner from "./assets/fun.svg";

function App() {
  // Required Variable
  const [length, setLength] = useState(4);
  const [characters, setCharacters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [password, setPassword] = useState("");

  // Callback used for memoization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let picker = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) picker = picker + "0123456789";
    if (characters) picker = picker + "!@#$%^&*<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * picker.length + 1);
      pass += picker.charAt(char);
    }
    setPassword(pass);
  }, [length, characters, numbers, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, characters, numbers, passwordGenerator]);

  // Ref hook
  const passwordRef = useRef(null);

  // Copy password to clipBoard
  const handleCopy = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };
  return (
    <main className="w-full lg:h-screen flex flex-auto  justify-center items-center h-auto py-10 ">
      <div className="flex-auto max-w-[75%] sm:w-[90%] magic-border bg-[#d4b8a1] rounded-md flex-col justify-center items-center py-10 md:py-18">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold font-[Helvetica] text-start md:text-center ">
          Random Password Generator
        </h1>
        <p className="text-l md:text-xl lg:text-2xl text-center my-5 ">
          Create strong and secure passwords to keep your account safe online.
        </p>
        <div className="flex flex-col lg:flex-row gap-10 m-4 p-3">
          <img src={banner} />
          <ul className="flex flex-col justify-center w-full">
            <li className="m-2 md:m-5 flex flex-col md:flex-row text-l md:text-xl justify-center items-center md:justify-start">
              <input
                type="text"
                value={password}
                placeholder="Password"
                readOnly
                ref={passwordRef}
                className="outline-none rounded-full md:rounded-l-full md:rounded-r-none md:w-[60%]  my-1 py-2 px-5 text-blue-700   bg-[#ffffffbd] text-center overflow-hidden"
              />
              <button
                className="outline-none md:w-[30%] rounded-full py-2 px-5 text-white md:rounded-r-full md:rounded-l-none bg-blue-700"
                onClick={handleCopy}
              >
                COPY
              </button>
            </li>
            <li className="m-2 md:m-5 flex flex-col text-l md:text-xl md:flex-row md:items-center gap-4 ">
              <span className="md:w-[40%]">Password Length : {length}</span>
              <div className="flex justify-center items-center gap-5 ">
                <span
                  className="text-lg flex justify-center items-center border-2 h-6  w-6 rounded-full cursor-pointer"
                  onClick={() => {
                    setLength((prev) => {
                      if (length > 4) {
                        return Number(prev) - 1;
                      }
                      return Number(prev);
                    });
                  }}
                >
                  -
                </span>
                <input
                  type="range"
                  min={4}
                  max={28}
                  value={length}
                  id="password"
                  className="cursor-pointer text-lg"
                  onChange={(e) => setLength(e.target.value)}
                />
                <span
                  className="text-lg border-2 h-6  flex justify-center items-center  w-6 rounded-full cursor-pointer"
                  onClick={() => {
                    setLength((prev) => {
                      if (length < 28) {
                        return Number(prev) + 1;
                      }
                      return Number(prev);
                    });
                  }}
                >
                  +
                </span>
              </div>
            </li>
            <li className="m-2 md:m-5 text-l gap-5 flex flex-col md:text-xl md:flex-row">
              <div>
                <span>Characters Used : </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-around items-center">
                <div>
                  <input type="checkbox" id="Alphabets" checked readOnly />
                  <span>ABC</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Numbers"
                    defaultChecked={numbers}
                    onChange={() => {
                      setNumbers((prev) => !prev);
                    }}
                  />
                  <label htmlFor="Numbers">123</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Charactes"
                    defaultChecked={characters}
                    onChange={() => {
                      setCharacters((prev) => !prev);
                    }}
                  />
                  <label htmlFor="Charactes">!@$</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
