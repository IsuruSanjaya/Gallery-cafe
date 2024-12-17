import React from 'react';
import '../index.css'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Company Info */}
        <div style={{ flex: '1', margin: '10px' }}>
          <h3>Gallery Cafe</h3>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li><a href="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/menu" style={{ color: '#fff', textDecoration: 'none' }}>Menu</a></li>
            <li><a href="/reservations" style={{ color: '#fff', textDecoration: 'none' }}>Reservations</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>Contact Us</h4>
          <p>Email: info@Gallerycafe.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Social Media */}
        <div style={{ flex: '1', margin: '10px' }}>
          <h4>Follow Us</h4>
          <div>
            <a href="https://facebook.com" style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Facebook</a>
            <a href="https://twitter.com" style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Twitter</a>
            <a href="https://instagram.com" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
