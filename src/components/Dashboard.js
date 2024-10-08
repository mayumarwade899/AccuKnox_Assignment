import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Widget from "./Widget";
import { addWidget } from "../redux/actions";
import Modal from "react-modal";
import Sidebar from "./Sidebar";

Modal.setAppElement("#root");

function Dashboard() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: "", text: "" });
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

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
    if (newWidget.name && newWidget.text && selectedCategory) {
      dispatch(addWidget(selectedCategory, newWidget));
      closeModal();
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="top-bar">
        <h4>Dashboard V2</h4>
        <div>
          <input
            type="text"
            placeholder="Search widget..."
            value={search}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-top-section">
          <h3>CNAPP Dashboard</h3>
          <div className="side-section">
            <button className="side-button" onClick={openModal}>
              Add Widget +
            </button>
            <button className="side-button" onClick={toggleSidebar}>
              Category Section
            </button>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.name} className="category">
            <h3>{category.name}</h3>
            <div className="widgets">
              {category.widgets
                .filter((widget) => widget.name.toLowerCase().includes(search))
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

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Widget Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Add New Widget</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="selector"
              
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
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
    </div>
  );
}

export default Dashboard;
