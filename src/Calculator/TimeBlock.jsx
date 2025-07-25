function TimeInputBlock({ index, value, onChange }) {
  const { date, start, end } = value;

  return (
    <div className="time-block">
      {/* <span>{index + 1}</span> */}
      <input
        type="date"
        value={date}
        onChange={(e) => onChange(index, { ...value, date: e.target.value })}
      />
      <input
        type="time"
        value={start}
        onChange={(e) => onChange(index, { ...value, start: e.target.value })}
      />
      ~
      <input
        type="time"
        value={end}
        onChange={(e) => onChange(index, { ...value, end: e.target.value })}
      />
    </div>
  );
}

export default TimeInputBlock;
