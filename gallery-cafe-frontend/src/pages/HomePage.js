import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HomePage.css";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get user role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    // Fetch menu items
    axios
      .get("http://localhost:5000/api/menu/")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <header className="header">
          <h1>Welcome to Gallery Cafe</h1>
          <p>Experience the best dining in Colombo</p>
        </header>

        <br></br>
        {/* Display menu items */}
        <section className="menu">
          <div className="menu-items">
            {menuItems.slice(0, 12).map((item) => (
              <div key={item._id}>
                <div className="card">
                  <img
                    src={`${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>

                    <p className="card-text">
                      <strong>Price: </strong>Rs {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
            <br></br>
      </div>
     
    </>
  );
};

export default HomePage;
