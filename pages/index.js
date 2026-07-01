import React, { useState } from "react";

export default function YouTubeGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [copied, setCopied] = useState(null);

  const titleHooks = [
    `[NUMBER] {keyword} That {action}`,
    `EXPOSED: The Truth About {keyword}`,
    `{keyword} HACK That {action}`,
    `Why {keyword} Is {adjective} (Explained)`,
    `{keyword} Gone WRONG 😱`,
    `I Tried {keyword} For 30 Days...`,
    `The {adjective} {keyword} Guide`,
    `{keyword} Mistakes You're Making`,
    `How To {action} With {keyword}`,
    `The BEST {keyword} In [YEAR]`,
    `{keyword} Tutorial For Beginners`,
    `I Spent $1000 On {keyword}...`,
    `The {keyword} Challenge`,
    `UNBELIEVABLE {keyword} Results 🤯`,
    `{keyword} Tier List (S to F)`,
  ];

  const generateTitles = () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    const keywordArray = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);
    const keyword = keywordArray[0] || topic;

    const adjectives = ["best", "worst", "easy", "hard", "simple", "complex", "amazing", "crazy"];
    const actions = ["saves time", "changes lives", "makes money", "works", "wins", "dominates"];

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
      `Ever wondered how to ${topic.toLowerCase()}? Here's the complete guide.`,
      `This is the ULTIMATE guide to ${topic.toLowerCase()}.`,
      `Stop wasting time. Learn ${topic.toLowerCase()} the right way.`,
      `I'm breaking down everything about ${topic.toLowerCase()}.`,
    ];

    const ctas = [
      "Don't forget to like, subscribe, and hit the notification bell!",
      "Like and subscribe for more content like this!",
      "Subscribe and turn on notifications for daily uploads!",
      "Hit that subscribe button and join the community!",
    ];

    const generated = hooks.map((hook) => {
      const cta = ctas[Math.floor(Math.random() * ctas.length)];
      return `${hook}\n\n${cta}\n\nTimestamps:\n0:00 - Intro\n1:23 - Main Content\n8:45 - Conclusion\n\n#${keyword} #Tutorial #Guide`;
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
      const desc = descriptions[i] || "";
      csv += `"${title.replace(/"/g, '""')}","${desc.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "youtube-content.csv";
    a.click();
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .header {
          background: white;
          padding: 40px;
          border-radius: 16px;
          margin-bottom: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          font-size: 42px;
          margin-bottom: 10px;
          color: #667eea;
        }

        .header p {
          font-size: 16px;
          color: #666;
        }

        .grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }

        .panel {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
          font-size: 14px;
        }

        textarea,
        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
        }

        textarea:focus,
        input:focus {
          outline: none;
