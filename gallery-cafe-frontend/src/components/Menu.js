import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import "../common.css";
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [role, setRole] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: "", // Store base64 string here
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    axios
      .get("http://localhost:5000/api/menu/")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/menu/${id}`)
      .then((response) => {
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        toast.success("Deleted successfully!");
      })
      .catch((error) => console.log(error));
  };

  // Handle Edit
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedItem({
      name: item.name,
      type: item.type,
      description: item.description,
      price: item.price,
      image: item.image, // Store current base64 image string
    });
    setShowEditModal(true);
  };

  // Handle Image Upload (convert to base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedItem((prevState) => ({
        ...prevState,
        image: reader.result, // Base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Save Changes (update menu item)
  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:5000/api/menu/${currentItem._id}`, editedItem)
      .then((response) => {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item._id === currentItem._id ? { ...item, ...editedItem } : item
          )
        );
        setShowEditModal(false);
        toast.success("updated successfully!");
      })
      .catch((error) => console.log(error));
    toast.error("Unsuccess!");
  };

  // Handle Navigate to Add Menu Page
  const handleAddMenu = () => {
    navigate("/addmenu"); // Navigate to the "Add Menu" page
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Menu</h2>
        <button
          style={{ padding: 5, width: "200px" }}
          className="btn btn-primary"
          onClick={handleAddMenu} // Trigger the navigation to add menu page
        >
          Add Menu
        </button>
      </div>
      <div className="row">
    {menuItems.map(item => (
        <div className="col-md-4 d-flex align-items-stretch" key={item._id}>
            <div className="card mb-4">
                <img
                    src={`${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><strong>Category: </strong>{item.type}</p>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><strong>Price: </strong>Rs {item.price}</p>
                    {role === 'admin' && (
                        <div className="d-flex justify-content-between gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="btn btn-warning btn-sm"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-danger btn-sm"
                            >
                                <FaTrashAlt /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ))}
</div>


      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedItem.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={editedItem.type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedItem.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedItem.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {editedItem.image && (
                <img
                  src={editedItem.image} // Display selected image as base64 string
                  alt="Selected"
                  style={{
                    height: "100px",
                    objectFit: "contain",
                    marginTop: "10px",
                  }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
