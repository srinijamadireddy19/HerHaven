import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="group">
        <h4>Group 10</h4>
        <ul>
          <li>2211CS030103</li>
          <li>2211CS030153</li>
          <li>2211CS030168</li>
        </ul>
      </div>
      <div className="container">
        <p className="text">© 2025 HerHaven | Women Community Forum</p>
        <div className="icon-container">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
