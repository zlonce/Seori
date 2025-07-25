import React, { useState } from "react";
import "./Calculator.css";
import { getTotalPay } from "./PayCalculator";
import TimeInputBlock from "./TimeBlock";

function Calculator() {
  const [basicTimeWage, setBasicTimeWage] = useState(10500);
  const [eventTimeWage, setEventTimeWage] = useState(13500);

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

      <div className="result">
        총 예상 월급: {(totalPay || 0).toLocaleString()}원
      </div>

      <div className="buttons">
        <button onClick={addBlock} className="add-button">
          추가
        </button>
        <button className="ocr-button">가져오기</button>
      </div>
    </div>
  );
}

export default Calculator;
