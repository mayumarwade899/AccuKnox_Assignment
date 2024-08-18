import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../redux/actions";
import { FiX } from "react-icons/fi";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(categories[0].name);

  const handleToggleWidget = (categoryName, widgetName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    const widget = category.widgets.find((w) => w.name === widgetName);

    if (widget) {
      dispatch(removeWidget(categoryName, widgetName));
    } else {
      dispatch(
        addWidget(categoryName, { name: widgetName, text: "Placeholder text" })
      );
    }
  };

  return (
    isSidebarOpen && (
      <div className="sidebar">
        <div className="sidebar-top">
          <h2>Add Widget</h2>
          <FiX className="close-icon" onClick={toggleSidebar} />
        </div>
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`tab-button ${
                activeTab === category.name ? "active" : ""
              }`}
              onClick={() => setActiveTab(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {categories
            .filter((category) => category.name === activeTab)
            .map((category) => (
              <div key={category.name} className="sidebar-category">
                {category.widgets.map((widget) => (
                  <div key={widget.name} className="sidebar-widget">
                    <input
                      type="checkbox"
                      checked={category.widgets.some(
                        (w) => w.name === widget.name
                      )}
                      onChange={() =>
                        handleToggleWidget(category.name, widget.name)
                      }
                    />
                    <label>{widget.name}</label>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="sidebar-footer">
          <button className="confirm-button">Confirm</button>
          <button className="cancel-button" onClick={toggleSidebar}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

export default Sidebar;
