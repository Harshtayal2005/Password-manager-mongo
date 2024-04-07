import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import ViewPasswords from "./ViewPasswords";
import { v4 as uuidv4 } from "uuid";

/**
 * to change the styling of icons
 * eg - import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
        <FaThumbsDown size={30} style={{ fill: 'black' }} />
 */

const Manager = () => {
  const [visibility, setVisibility] = useState(false);
  const siteRef = useRef();
  const userNameRef = useRef();
  const pwdRef = useRef();
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:9999/");
    let password = await req.json();
    setpasswordArray(password);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    const newObj = {
      site: siteRef.current.value,
      username: userNameRef.current.value,
      password: pwdRef.current.value,
      id: uuidv4(),
    };

    setpasswordArray([...passwordArray, newObj]);

    let res = await fetch("http://localhost:9999/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObj),
    });

    siteRef.current.value = "";
    userNameRef.current.value = "";
    pwdRef.current.value = "";
  };

  const deletePassword = async (id) => {
    let cnfrm = confirm("Do you really want to delete your password?");
    if (cnfrm) {
      const newPasswordArray = passwordArray.filter((items) => items.id !== id);
      setpasswordArray(newPasswordArray);
      const response = await fetch(`http://localhost:9999/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      setTimeout(() => {
        alert("Password Deleted");
      }, 120);
    }
  };

  const editPassword = async (id) => {
    const values = passwordArray.filter((items) => items.id === id);
    siteRef.current.value = values[0].site;
    userNameRef.current.value = values[0].username;
    pwdRef.current.value = values[0].password;

    setpasswordArray(passwordArray.filter((items) => items.id !== id));
    const response = await fetch(`http://localhost:9999/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
  };

  const toggleVisibility = (currVisibility) => {
    if (!currVisibility) {
      pwdRef.current.type = "text";
      setVisibility(true);
    } else {
      pwdRef.current.type = "password";
      setVisibility(false);
    }
  };

  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      savePassword();
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* my container  */}
      <div className="py-10 lg:mx-36 md:mx-20 px-9 grow">
        <div className="font-bold flex flex-col items-center">
          <h1 className="py-2 text-4xl">
            <span className="py-2 text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="py-2 text-green-500">OP/&gt;</span>
          </h1>

          <p className="text-1xl text-gray-500">Your own password manager</p>
        </div>

        <div className="my-14 flex flex-col gap-3">
          <input
            type="py-2 text"
            placeholder="Enter Website URL"
            ref={siteRef}
            onKeyDown={handleKeyPress}
            className="rounded-2xl border px-5 w-full h-9 border-green-200 focus:border-green-400 outline-none"
          />

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="py-2 text"
              placeholder="Enter your username"
              ref={userNameRef}
              onKeyDown={handleKeyPress}
              className="rounded-2xl border px-5 md:w-[70%] h-9 border-green-200 focus:border-green-400 outline-none"
            />
            <div className=" md:w-[30%] h-9 relative">
              <input
                type="password"
                placeholder="Enter your password"
                ref={pwdRef}
                onKeyDown={handleKeyPress}
                className="rounded-2xl border px-5 w-full h-full border-green-200 focus:border-green-400 outline-none"
              />
              <span className="absolute flex items-center pr-5 inset-y-0 right-0">
                {visibility && (
                  <IoMdEyeOff
                    size={25}
                    className="hover:cursor-pointer"
                    onClick={() => toggleVisibility(visibility)}
                  ></IoMdEyeOff>
                )}
                {!visibility && (
                  <FaEye
                    size={22}
                    className="hover:cursor-pointer"
                    onClick={() => toggleVisibility(visibility)}
                  ></FaEye>
                )}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="bg-green-400 w-fit px-8 py-2 rounded-2xl flex justify-center items-center border border-green-900 gap-1 font-bold mx-auto"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>

          <p>Save</p>
        </button>

        <div className="passwords mt-10">
          <h1 className="font-bold text-[1.2rem] my-3 ">Your Passwords</h1>

          {passwordArray.length === 0 && (
            <div className="border border-black p-7 inline-block text-[1.2rem] font-semibold rounded-xl  text-sky-950  bg-yellow-100 ">
              <h1>
                No Passwords to show, Please add passwords{" "}
                <span className="text-[1.5rem]">&#128578;</span>{" "}
              </h1>
            </div>
          )}
          {passwordArray.length !== 0 && (
            <ViewPasswords
              passwordArray={passwordArray}
              deletePassword={deletePassword}
              editPassword={editPassword}
            ></ViewPasswords>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
