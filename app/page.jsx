"use client";
import { useState } from "react";
export default function Home(){
 const [input,setInput]=useState("");
 const [result,setResult]=useState("");
 const [loading,setLoading]=useState(false);
 async function handleGenerate(){
    if(!input) return;
    setLoading(true);
    setResult("");
    const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:input})});
    const data=await res.json();
    setLoading(false);
    setResult(data.text||"Error");
 }
 return (
   <div className="flex min-h-screen items-center justify-center">
     <div className="w-full max-w-lg p-8 space-y-4 border rounded">
       <h1 className="text-2xl font-bold">AI Writing Assistant</h1>
       <textarea className="w-full p-2 border rounded" rows={5} placeholder="Enter a prompt..." value={input} onChange={e=>setInput(e.target.value)}/>
       <button onClick={handleGenerate} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading? "Generating..." : "Generate"}</button>
       {result && (<div className="p-4 bg-gray-100 rounded"><h3 className="font-semibold mb-2">Result:</h3><p>{result}</p></div>)}
     </div>
   </div>
 );
}