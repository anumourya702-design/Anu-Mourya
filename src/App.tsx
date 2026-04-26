import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Terminal, 
  ChevronDown, 
  Play, 
  Cpu, 
  Sparkles
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { PROBLEMS, ProblemType } from "./constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function App() {
  const [selectedProblemId, setSelectedProblemId] = useState<ProblemType>(ProblemType.EVEN_ODD);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isSolving, setIsSolving] = useState(false);
  const [result, setResult] = useState<{ code: string; output: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedProblem = PROBLEMS.find(p => p.id === selectedProblemId) || PROBLEMS[0];

  useEffect(() => {
    const initialInputs: Record<string, string> = {};
    selectedProblem.fields.forEach(f => {
      initialInputs[f.id] = "";
    });
    setInputs(initialInputs);
    setResult(null);
    setError(null);
  }, [selectedProblemId]);

  const handleInputChange = (fieldId: string, value: string) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const solveProblem = async () => {
    setIsSolving(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are a World-Class C++ Developer. 
        User Request: ${selectedProblem.label}
        Description: ${selectedProblem.description}
        Inputs: ${JSON.stringify(inputs)}

        MANDATORY GUIDELINES:
        1. Write the code in STRICT C++ Object Oriented Programming (OOP) style.
        2. Use a Class (e.g., class Solver or class Problem) with private attributes and public methods.
        3. COMMENTING: Every single line of code MUST have a comment at the end (e.g., int x; // declaring integer x). 
        4. No line should be left without a comment.
        5. Use meaningful variable names and follow high-quality coding standards (like ChatGPT-4).
        6. Provide the exact output string that would result from running this code with the provided inputs.

        EXACT JSON RESPONSE:
        {
          "code": "/* C++ Code with // comments on EVERY line */",
          "output": "The console output string"
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate solution. Error syncing with AI Engine.");
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061109] text-[#e6f3e8] flex flex-col font-sans overflow-x-hidden p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-8 flex-1">
        {/* Header Section */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center gold-glow">
              <Code2 className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                OOP <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#fcc419]">Expert Solver</span>
              </h1>
              <p className="text-[10px] text-[#7da583] uppercase tracking-[0.2em] font-bold">Industry Standard C++ • Lab Companion</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#0c1a10] border border-[#1a2e1e] text-[10px] font-mono text-[#22c55e] flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse"></div>
              CSE SEM 4 • OOP CONCEPT
            </div>
          </div>
        </motion.header>

        {/* Main Selection Card */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0c1a10] p-8 rounded-[2rem] border border-[#1a2e1e] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest pl-1">Select Problem Component</label>
                <div className="relative">
                  <select 
                    value={selectedProblemId}
                    onChange={(e) => setSelectedProblemId(e.target.value as ProblemType)}
                    className="w-full bg-[#040d06] border border-[#1a2e1e] text-white py-4 px-6 rounded-2xl appearance-none focus:outline-none focus:border-[#22c55e] transition-all cursor-pointer font-medium text-base shadow-inner"
                  >
                    {PROBLEMS.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#22c55e]">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProblemId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2 border-l-4 border-[#22c55e] pl-4">
                    <h3 className="text-xl font-bold text-white">{selectedProblem.label}</h3>
                    <p className="text-sm text-[#7da583] leading-relaxed font-medium">{selectedProblem.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProblem.fields.map(field => (
                      <div key={field.id} className="space-y-2">
                        <label className="text-[10px] font-black text-[#7da583] uppercase tracking-widest pl-1">
                          {field.label}
                        </label>
                        <input 
                          type={field.type}
                          placeholder={field.placeholder}
                          value={inputs[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full bg-[#040d06] border border-[#1a2e1e] rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#22c55e]/30 outline-none transition-all text-sm font-mono placeholder:text-[#2a4d31]"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={solveProblem}
                disabled={isSolving}
                className="flex-1 py-4 rounded-xl btn-gradient text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_30px_rgba(252,196,25,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSolving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                ) : <Play className="w-5 h-5 fill-current" />}
                Analyze & Solve
              </button>
              <button 
                onClick={() => {
                  setInputs({});
                  setResult(null);
                }}
                className="px-8 py-4 rounded-xl bg-[#040d06] border border-[#1a2e1e] text-[#7da583] font-bold uppercase tracking-widest text-[10px] hover:text-[#22c55e] hover:border-[#22c55e] transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Output Area */}
        <AnimatePresence>
          {result ? (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6"
            >
              {/* Code Panel */}
              <div className="bg-[#040d06] rounded-3xl border border-[#1a2e1e] overflow-hidden flex flex-col shadow-2xl min-h-[500px]">
                <div className="flex items-center justify-between px-6 py-4 bg-[#0c1a10] border-b border-[#1a2e1e]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[10px] font-mono text-[#7da583] uppercase tracking-widest font-bold">Source: solution.cpp</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(result.code)}
                    className="text-[10px] uppercase text-[#fcc419] font-bold hover:underline"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex-1 overflow-x-auto custom-scrollbar bg-[#1e1e1e]">
                  <SyntaxHighlighter 
                    language="cpp" 
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      minHeight: '100%',
                      background: 'transparent'
                    }}
                  >
                    {result.code}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* Console Result */}
              <div className="bg-[#0c1a10] rounded-3xl border border-[#1a2e1e] p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Terminal className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#22c55e]">Console Output</h4>
                </div>
                <div className="relative z-10 bg-black/40 rounded-2xl p-6 font-mono text-sm text-[#e6f3e8] border border-[#1a2e1e]">
                  <p className="text-[#3e5f44] mb-2 font-bold tracking-tighter">[SYS] Compiling GCC 12...</p>
                  <p className="text-[#3e5f44] mb-4 font-bold tracking-tighter">[SYS] Execution Payload Received</p>
                  <pre className="whitespace-pre-wrap text-[#22c55e] font-bold text-lg leading-relaxed drop-shadow-sm">
                    {`> Output: ${result.output}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[300px] rounded-[2rem] border-2 border-dashed border-[#1a2e1e] flex flex-col items-center justify-center gap-6 text-center px-8"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#0c1a10] border border-[#1a2e1e] flex items-center justify-center text-[#2a4d31]">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Compiler Standby</h3>
                <p className="text-sm text-[#7da583] max-w-xs mx-auto font-medium">Inputs required for computation analysis.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pb-12"
        >
          <div className="bg-gradient-to-br from-[#0c1a10] to-[#040d06] p-8 rounded-[2rem] border border-[#1a2e1e] text-center flex flex-col items-center gap-6 relative shadow-2xl">
             {/* Gold corner accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#fcc419]/30 rounded-tl-lg"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#fcc419]/30 rounded-br-lg"></div>

            <p className="text-[10px] font-black text-[#3e5f44] uppercase tracking-[0.4em]">Engineered By</p>
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-white">
                <span className="text-[#fcc419]">Anurag</span> <span className="opacity-90">Mourya</span>
              </h2>
              <p className="text-xs font-bold text-[#22c55e] uppercase tracking-[0.3em]">Computer Science & Engineering</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 scale-90">
              <div className="px-5 py-2 rounded-xl bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 text-[10px] font-black uppercase tracking-wider">CSE • 4TH SEMESTER</div>
              <div className="px-5 py-2 rounded-xl bg-[#fcc419]/10 text-[#fcc419] border border-[#fcc419]/30 text-[10px] font-black uppercase tracking-wider">2nd YEAR STUDENT</div>
              <div className="px-5 py-2 rounded-xl bg-white/5 text-gray-400 border border-white/10 text-[10px] font-black uppercase tracking-wider">C++ LAB PROJECTS</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto py-8 border-t border-[#1a2e1e] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#2a4d31] font-black uppercase tracking-widest bg-transparent">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            GCC v12.1 STABLE
          </div>
          <span>MEMORY 100% IDLE</span>
        </div>
        <div className="text-right flex items-center gap-2">
          <span>OOP MASTER © 2026</span>
          <div className="w-1 h-1 bg-[#2a4d31] rounded-full"></div>
          <span>GREEN GOLD EDITION</span>
        </div>
      </footer>
    </div>
  );
}

