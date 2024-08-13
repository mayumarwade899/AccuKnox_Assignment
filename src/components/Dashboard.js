import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Widget from "./Widget";
import { addWidget, removeWidget } from "../redux/actions";
import Modal from "react-modal";
import { FiMenu, FiX } from "react-icons/fi";

Modal.setAppElement("#root");

function Dashboard() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: "", text: "" });

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewWidget({ name: "", text: "" });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWidget((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newWidget.name && newWidget.text) {
      dispatch(addWidget(categories[0].name, newWidget));
      closeModal();
    }
  };

  const handleToggleWidget = (categoryName, widgetName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    const widget = category.widgets.find((wid) => wid.name === widgetName);

    if (widget) {
      dispatch(removeWidget(categoryName, widgetName));
    } else {
      dispatch(
        addWidget(categoryName, { name: widgetName, text: "Placeholder text" })
      );
    }
  };

  return (
    <div>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search widget..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="side-section">
          <button className="add-widget-button" onClick={openModal}>
            + AddWidget
          </button>
          <FiMenu className="menu-icon" onClick={toggleSidebar} />
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.name} className="category">
          <h3>{category.name}</h3>
          <div className="widgets">
            {category.widgets
              .filter(
                (widget) =>
                  widget.name.toLowerCase().includes(search)
              )
              .map((widget) => (
                <Widget
                  key={widget.name}
                  category={category.name}
                  widget={widget}
                />
              ))}
            <div className="widget add-widget-card" onClick={openModal}>
              <div className="add-widget-card-content">+ Add Widget</div>
            </div>
          </div>
        </div>
      ))}

      {isSidebarOpen && (
        <div className="sidebar">
          <FiX className="close-icon" onClick={toggleSidebar} />
          <h2>Manage Widgets</h2>
          {categories.map((category) => (
            <div key={category.name} className="sidebar-category">
              <h4>{category.name}</h4>
              {category.widgets.map((widget) => (
                <div key={widget.name} className="sidebar-widget">
                  <input
                    type="checkbox"
                    checked={category.widgets.some(w => w.name === widget.name)}
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
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Widget Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add New Widget</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="name"
            placeholder="Widget Name"
            value={newWidget.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="text"
            placeholder="Widget Text"
            value={newWidget.text}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Widget</button>
          <button type="button" onClick={closeModal} className="modal-close">
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;
