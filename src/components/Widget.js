import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../redux/actions";
import { FaTimes } from "react-icons/fa";

function Widget({ category, widget }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget(category, widget.name));
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <FaTimes className="remove-icon" onClick={handleRemove} />
        <h4 className="widget-name">{widget.name}</h4>
      </div>
      <p>{widget.text}</p>
    </div>
  );
}

export default Widget;
