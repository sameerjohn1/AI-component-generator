import React from "react";
import Navbar from "./components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#111",
    borderColor: "#444",
    color: "#fff",
    padding: "2px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#888",
    },
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#111",
    border: "1px solid #444",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#222" : "#111",
    color: "#fff",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#333",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#888",
  }),

  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#888",
    "&:hover": {
      color: "#fff",
    },
  }),
};

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind +Bootstrap" },
  ];
  return (
    <div>
      <Navbar />

      <div className="flex items-center px-[100px] justify-between gap-[30px]">
        <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[25px] font-semibold sp-text">
            AI component generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">
            Describe your component and let AI will code for you.
          </p>
          <p className="text-[15px] fonr-[700] mt-4">FrameWork</p>
          <Select className="mt-2" options={options} styles={customStyles} />
          <p className="text-[gray] mt-5 text-[16px]">
            Describe your component
          </p>
          <textarea
            className="w-full min-h-[200px] p-[10px] rounded-xl bg-[#09090B] mt-3"
            placeholder="Describe your component in detail and let ai will code for your component"
          ></textarea>
          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click to generate button to generate your code
            </p>
            <button
              className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600
           mt-3  w-28 text-center gap-1 transition-all hover:opacity-[.8] cursor-pointer"
            >
              <i>
                <BsStars />
              </i>
              Generate
            </button>
          </div>
        </div>
        <div className="right w-[50%] h-[80vh] bg-[#141319] mt-5 rounded-xl ">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
