import { useState } from "react";
import Navbar from "./components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

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
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  const ai = new GoogleGenAI({ apiKey });

  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components.
        Generate a UI component for: ${prompt}
        Framework to use: ${frameWork.value}

        Requirements:
        - Clean, well-structured code
        - Optimized for SEO
        - Modern, responsive UI
        - High-quality hover effects, shadows, animations
        - Return ONLY the code in Markdown fenced code blocks
        - Provide the whole code in a single HTML file
        `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate code. Try again!");
    } finally {
      setLoading(false);
    }
  }

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]+?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy code.");
    }
  };

  const downloadFile = () => {
    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row items-start px-5 lg:px-[100px] gap-6 mt-5">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-[#141319] p-5 rounded-xl">
          <h3 className="text-2xl font-semibold sp-text">
            AI Component Generator
          </h3>
          <p className="text-gray-400 mt-2 text-sm">
            Describe your component and AI will generate the code for you.
          </p>

          <p className="text-gray-300 font-semibold mt-4">Framework</p>
          <Select
            className="mt-2"
            options={options}
            styles={customStyles}
            value={frameWork}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p className="text-gray-400 mt-5 text-sm">Describe your component</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[200px] mt-2 p-3 rounded-xl bg-[#09090B] text-white focus:outline-none"
            placeholder="Describe your component in detail..."
          />

          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-400 text-sm">
              Click 'Generate' to create your code
            </p>
            <button
              disabled={loading}
              onClick={getResponse}
              className="generate flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 gap-1 hover:opacity-80 transition"
            >
              {loading ? (
                <BeatLoader color="white" size={10} />
              ) : (
                <>
                  <BsStars />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-[#141319] rounded-xl h-[80vh] relative">
          {!outputScreen ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="circle p-5 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-2xl">
                <HiOutlineCode />
              </div>
              <p className="mt-3">Your component and code will appear here</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex bg-[#17171C] h-14 rounded-t-xl overflow-hidden">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 text-white font-medium ${
                    tab === 1 ? "bg-[#333]" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 text-white font-medium ${
                    tab === 2 ? "bg-[#333]" : ""
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex justify-between items-center px-4 py-2 bg-[#17171C] border-b border-[#222]">
                <p className="text-white font-semibold">Editor</p>
                <div className="flex gap-2">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333] transition"
                      >
                        <IoCopy />
                      </button>
                      <button
                        onClick={downloadFile}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333] transition"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333] transition"
                      >
                        <ImNewTab />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333] transition">
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editor / Preview */}
              <div className="h-[calc(100%-112px)]">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    language="html"
                  />
                ) : (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full bg-white text-black"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Preview */}
      {isNewTabOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="flex justify-between items-center h-14 px-4 border-b border-gray-300">
            <p className="font-bold text-black">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 hover:bg-[#333] transition"
            >
              <IoCloseSharp color="black" />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100%-56px)]" />
        </div>
      )}
    </>
  );
};

export default Home;
