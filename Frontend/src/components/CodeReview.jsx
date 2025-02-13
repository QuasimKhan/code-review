import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardCopy } from "lucide-react";

const CodeReview = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_END_POINT}/ai/get-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: code }),
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        setReview(data.review || "No response");
      } catch {
        setReview(text);
      }
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("Error reviewing code");
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Code Review</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        rows={6}
        className="w-full p-2 border rounded-md"
      ></textarea>
      <button 
        onClick={handleReview} 
        disabled={loading} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Reviewing..." : "Review"}
      </button>
      {review && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold">Review Result:</h3>
          <ReactMarkdown 
            className="prose"
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="relative">
                    <SyntaxHighlighter 
                      style={vscDarkPlus} 
                      language={match[1]} 
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                    <button 
                      onClick={() => copyToClipboard(String(children))} 
                      className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-md hover:bg-gray-700"
                    >
                      {copied ? "Copied!" : <ClipboardCopy size={18} />}
                    </button>
                  </div>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              }
            }}
          >
            {review}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default CodeReview;
