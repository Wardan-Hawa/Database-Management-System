import { useState } from 'react';
import logo from "../../assets/medical/images/logo.png";
import TopBar from "../TopBar/TopBar";

const Header = () => {
  const [activeMenuItem, setActiveMenuItem] = useState();

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  }

  return (
    <>
      <TopBar />
      <header id="header" data-menu-padding="28" data-sticky-menu-padding="8">
        <div id="header-wrap">
          <div className="container">
            <div className="header-row">
              <div id="logo">
                <a href="/" className="standard-logo">
                  <img src={logo} alt="Canvas Logo" />
                </a>
                <a href="/" className="retina-logo">
                  <img src={logo} alt="Canvas Logo" />
                </a>
              </div>

              <div id="primary-menu-trigger">
                <svg className="svg-trigger" viewBox="0 0 100 100">
                  <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                  <path d="m 30,50 h 40"></path>
                  <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
                </svg>
              </div>

              <nav className="primary-menu style-3 menu-spacing-margin">
                <ul className="menu-container">
                  <li className={`menu-item ${activeMenuItem === "home" ? "current" : ""}`} onClick={() => handleMenuItemClick("home")}>
                    <a className="menu-link" href="/">
                      <div>Home</div>
                    </a>
                  </li>
                  <li className={`menu-item ${activeMenuItem === "doctors" ? "current" : ""}`} onClick={() => handleMenuItemClick("doctors")}>
                    <a className="menu-link" href="Database">
                      <div>My Database</div>
                    </a>
                    
                  </li>
                  <li className={`menu-item ${activeMenuItem === "doctors" ? "current" : ""}`} onClick={() => handleMenuItemClick("doctors")}>
                    <a className="menu-link" href="MyResearchGroupsPage">
                      <div>My Research Groups</div>
                    </a>
                    
                  </li>
                  <li className={`menu-item ${activeMenuItem === "about" ? "current" : ""}`} onClick={() => handleMenuItemClick("about")}>
                    <a className="menu-link" href="About-us">
                      <div>About us</div>
                    </a>
                  </li>
                  <li className={`menu-item ${activeMenuItem === "contact" ? "current" : ""}`} onClick={() => handleMenuItemClick("contact")}>
                    <a className="menu-link" href="contact-us">
                      <div>contact us</div>
                    </a>
                  </li>
                  
                  <li className={`menu-item ${activeMenuItem === "Profile" ? "current" : ""}`} onClick={() => handleMenuItemClick("Profile")}>
                    <a className="menu-link" href="Profile">
                      <div>Profile</div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="header-wrap-clone"></div>
      </header>
    </>
  );
};

export default Header;
