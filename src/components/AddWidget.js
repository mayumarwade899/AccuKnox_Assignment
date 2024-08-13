import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../redux/actions";

function AddWidget({ category }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWidget(category, { name, text }));
    setName("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Widget name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Widget text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Widget</button>
    </form>
  );
}

export default AddWidget;
