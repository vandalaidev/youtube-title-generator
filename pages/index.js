import React, { useState } from "react";

export default function YouTubeGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [copied, setCopied] = useState(null);

  const titleHooks = [
    "[NUMBER] {keyword} That {action}",
    "EXPOSED: The Truth About {keyword}",
    "{keyword} HACK That {action}",
    "Why {keyword} Is {adjective} (Explained)",
    "{keyword} Gone WRONG",
    "I Tried {keyword} For 30 Days...",
    "The {adjective} {keyword} Guide",
    "{keyword} Mistakes You're Making",
    "How To {action} With {keyword}",
    "The BEST {keyword}",
  ];

  const generateTitles = () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    const keywordArray = keywords.split(",").map(k => k.trim()).filter(k => k);
    const keyword = keywordArray[0] || topic;
    const adjectives = ["best", "worst", "easy", "hard", "amazing", "crazy"];
    const actions = ["saves time", "changes lives", "makes money", "wins"];

    const generated = titleHooks.slice(0, 8).map((hook) => {
      let title = hook
        .replace("{keyword}", keyword)
        .replace("{action}", actions[Math.floor(Math.random() * actions.length)])
        .replace("{adjective}", adjectives[Math.floor(Math.random() * adjectives.length)])
        .replace("[NUMBER]", Math.floor(Math.random() * 10) + 3);
      return title;
    });

    setTitles(generated);
    generateDescriptions(topic, keyword);
  };

  const generateDescriptions = (topic, keyword) => {
    const hooks = [
      `In this video, I show you exactly how to ${topic.toLowerCase()}.`,
      `Ever wondered how to ${topic.toLowerCase()}? Here's the guide.`,
      `This is the ULTIMATE guide to ${topic.toLowerCase()}.`,
      `Stop wasting time. Learn ${topic.toLowerCase()} the right way.`,
    ];

    const ctas = [
      "Don't forget to like, subscribe, and hit the notification bell!",
      "Like and subscribe for more!",
      "Subscribe for daily uploads!",
    ];

    const generated = hooks.map((hook) => {
      const cta = ctas[Math.floor(Math.random() * ctas.length)];
      return `${hook}\n\n${cta}\n\nTimestamps:\n0:00 - Intro\n2:30 - Main\n8:00 - Outro\n\n#${keyword} #Tutorial`;
    });

    setDescriptions(generated);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadAsCSV = () => {
    if (titles.length === 0) {
      alert("Generate titles first!");
      return;
    }

    let csv = "TITLE,DESCRIPTION\n";
    titles.forEach((title, i) => {
      const desc = (descriptions[i] || "").replace(/"/g, '""');
      csv += `"${title.replace(/"/g, '""')}","${desc}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "youtube-content.csv";
    a.click();
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "16px", marginBottom: "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "10px", color: "#667eea" }}>🎬 YouTube Title Generator</h1>
          <p style={{ fontSize: "16px", color: "#666" }}>Generate viral titles and descriptions in seconds</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px" }}>
          {/* Input */}
          <div style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>Video Topic</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to make money online"
                style={{ width: "100%", padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontFamily: "inherit", minHeight: "80px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>Keywords</label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., money, passive income"
                style={{ width: "100%", padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontFamily: "inherit", minHeight: "80px" }}
              />
            </div>

            <button
              onClick={generateTitles}
              style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none", borderRadius: "8px", color: "white", fontWeight: "600", cursor: "pointer" }}
            >
              Generate
            </button>

            {titles.length > 0 && (
              <button
                onClick={downloadAsCSV}
                style={{ width: "100%", padding: "14px", background: "#f0f0f0", border: "none", borderRadius: "8px", color: "#333", fontWeight: "600", cursor: "pointer", marginTop: "10px" }}
              >
                📥 Download CSV
              </button>
            )}
          </div>

          {/* Results */}
          <div style={{ background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
            {titles.length === 0 ? (
              <p style={{ textAlign: "center", color: "#999", padding: "60px 20px" }}>✨ Enter a topic to get started</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {titles.map((title, i) => (
                  <div key={i} style={{ background: "#f9f9f9", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #667eea" }}>
                    <h3 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", marginBottom: "10px" }}>Title {i + 1}</h3>
                    <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px", lineHeight: "1.4" }}>{title}</div>
                    <h3 style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", marginBottom: "10px", marginTop: "20px" }}>Description</h3>
                    <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "15px", whiteSpace: "pre-wrap", maxHeight: "120px", overflow: "auto" }}>{descriptions[i]}</div>
                    <button
                      onClick={() => copyToClipboard(title, `title-${i}`)}
                      style={{ width: "100%", padding: "10px", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", marginBottom: "8px" }}
                    >
                      {copied === `title-${i}` ? "✓ Copied!" : "Copy Title"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(descriptions[i], `desc-${i}`)}
                      style={{ width: "100%", padding: "10px", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
                    >
                      {copied === `desc-${i}` ? "✓ Copied!" : "Copy Desc"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
