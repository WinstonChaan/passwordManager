import React, { useState, useRef } from "react";
import { FaRegCopy, FaWindowClose } from "react-icons/fa";

function Main() {
  let [password, setPassword] = useState("Password1");
  const [database, setDatabase] = useState([]);
  let emailRef = useRef();
  let websiteRef = useRef();

  const generate = () => {
    password = "";
    const SYMBOLS =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/";
    for (let i = 0; i < 16; i++) {
      password += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
    }
    setPassword(password);
  };

  const save = () => {
    if (websiteRef.current.value !== "") {
      const ans = {
        website: websiteRef.current.value,
        email: emailRef.current.value,
        password: password,
      };

      setPassword("");
      websiteRef.current.value = "";
      emailRef.current.value = "";
      setDatabase(database.concat(ans));
      setPassword("SAVED!");
    } else {
      return;
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setPassword("COPPIED!");
  };

  const copyData = () => {
    navigator.clipboard.writeText(database);
    setPassword("COPPIED!");
  };

  const deleteData = (x) => {
    setDatabase((prev) => prev.filter((e) => e !== x));
  };

  return (
    <div className='grid place-items-center w-screen min-h-screen h-max bg-slate-400'>
      <div className='w-full md:w-1/2 grid bg-gray-500 h-max rounded-lg place-items-center pb-10'>
        <h1 className='text-white first-line:tracking-tighter font-extrabold text-6xl p-5 text-center'>
          PASSWORD MANAGER
        </h1>
        <button
          onClick={generate}
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
        >
          Generate Password
        </button>
        <h1 id='passwordID' className='text-center p-5 font-extrabold text-xl'>
          {password}
          <FaRegCopy
            size='15px'
            className='cursor-pointer inline ml-3'
            onClick={copy}
          />
        </h1>
        <form>
          <input
            ref={emailRef}
            type='text'
            className='mb-1 w-full md:w-96 appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Email'
          ></input>
          <input
            ref={websiteRef}
            type='text'
            className='w-full md:w-96 appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Website'
          ></input>
        </form>
        <button
          onClick={save}
          className='mb-5 ml-2 mt-3 w-1/2 md:w-96 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
        >
          SAVE
        </button>
        {database.map((x) => (
          <div className='bg-neutral-400 p-2 rounded-md mt-1 w-96'>
            <FaWindowClose
              size='15px'
              className='cursor-pointer inline mr-1'
              onClick={() => deleteData(x)}
            />
            <FaRegCopy
              size='15px'
              className='cursor-pointer inline'
              onClick={copyData}
            />
            <h1 className='m-0 text-start text-sm'>
              Website: {x.website}
              <br />
              Email: {x.email}
              <br />
              Password: {x.password}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
