import React, { useState } from "react";
import "./Calculator.css";
import { getTotalPay } from "./PayCalculator";
import TimeInputBlock from "./TimeBlock";

function Calculator() {
  const [basicTimeWage, setBasicTimeWage] = useState(10500);
  const [eventTimeWage, setEventTimeWage] = useState(13500);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");

  const [blocks, setBlocks] = useState(
    Array.from({ length: 5 }, () => ({
      date: "",
      start: "18:00",
      end: "21:00",
    }))
  );

  const handleChange = (index, newValue) => {
    const updated = [...blocks];
    updated[index] = newValue;
    setBlocks(updated);
  };

  const handleImport = () => {
    const parsed = parseImportedText(importText);
    if (parsed.length > 0) {
      setBlocks(parsed);
      setShowImport(false);
      setImportText("");
    } else {
      alert("형식을 인식하지 못했어요.");
    }
  };

  function parseImportedText(text, year = new Date().getFullYear()) {
    const lines = text.trim().split("\n");
    return lines
      .map((line) => {
        const match = line.match(
          /(\d{1,2})\/(\d{1,2})\s+(\d{1,2}:\d{2})\s*~\s*(\d{1,2}:\d{2})/
        );
        if (!match) return null;

        const [, mm, dd, start, end] = match;
        const date = `${year}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        return { date, start, end };
      })
      .filter(Boolean);
  }

  const addBlock = () => {
    setBlocks([...blocks, { date: "", start: "18:00", end: "21:00" }]);
  };

  const totalPay = blocks.reduce((sum, b) => {
    if (!b.start || !b.end) return sum;

    const todayStr = new Date().toISOString().split("T")[0];
    const dateStr = b.date || todayStr;

    const startFull = `${dateStr}T${b.start}`;
    const endFull = `${dateStr}T${b.end}`;

    return sum + getTotalPay(startFull, endFull, basicTimeWage, eventTimeWage);
  }, 0);

  return (
    <div>
      <div className="cost">
        <div>
          기본 시급 :
          <input
            type="number"
            value={basicTimeWage}
            onChange={(e) => setBasicTimeWage(Number(e.target.value))}
          />{" "}
          원
        </div>
        <div>
          추가 시급 :
          <input
            type="number"
            value={eventTimeWage}
            onChange={(e) => setEventTimeWage(Number(e.target.value))}
          />{" "}
          원
        </div>
      </div>

      {blocks.map((block, i) => (
        <TimeInputBlock
          key={i}
          index={i}
          value={block}
          onChange={handleChange}
        />
      ))}

      <div className="totalPay">
        총 월급: {(totalPay || 0).toLocaleString()}원
      </div>

      {showImport && (
        <div style={{ padding: "10px", background: "#eee", margin: "10px" }}>
          <textarea
            rows="8"
            style={{ width: "100%" }}
            placeholder="예: 6/13 6:30 ~ 10:20"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
          <div style={{ marginTop: "8px" }}>
            <button onClick={handleImport}>적용</button>
            <button
              onClick={() => setShowImport(false)}
              style={{ marginLeft: "8px" }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <div className="buttons">
        <button onClick={addBlock} className="add-button">
          추가
        </button>

        <button onClick={() => setShowImport(true)} className="ocr-button">
          가져오기
        </button>
      </div>
    </div>
  );
}

export default Calculator;
