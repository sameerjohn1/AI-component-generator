import { useState } from "react";
import Navbar from "./components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";

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
  const [outputScreen, setOutputScreen] = useState(true);
  const [tab, setTab] = useState(1);

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
        <div className="right mt-2 w-[50%] h-[80vh] bg-[#141319] mt-5 rounded-xl ">
          {outputScreen === false ? (
            <>
              <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                <div className="circle p-[20px] w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-[50%] bg-gradient-to-r from-purple-400 to-purple-600">
                  <HiOutlineCode />
                </div>
                <p className="text-[16px] text-[gray] mt-3">
                  Your component and code will appear here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top bg-[#17171C] w-full h-[60px]  flex items-center gap-[15px] px-[20px]">
                <button
                  onClick={() => setTab(1)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 1 ? "bg-[#333]" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 2 ? "bg-[#333]" : ""
                  }`}
                >
                  Preview
                </button>
              </div>

              <div className="top-2 bg-[#17171C] w-full h-[60px]  flex items-center justify-between gap-[15px] px-[20px]">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>
                <div div className="right flex items-center gap-[10px]">
                  {tab === 1 ? (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center
                  justify-center transition-all hover:bg-[#333]"
                      >
                        <IoCopy />
                      </button>
                      <button
                        className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center
                  justify-center transition-all hover:bg-[#333]"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center
                  justify-center transition-all hover:bg-[#333]"
                      >
                        <ImNewTab />
                      </button>
                      <button
                        className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center
                  justify-center transition-all hover:bg-[#333]"
                      >
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="editor h-full">
                {tab === 1 ? (
                  <>
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language="html"
                      value=""
                    />
                  </>
                ) : (
                  <>
                    <div className="preview w-full h-full bg-white text-black flex items-center justify-center"></div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
