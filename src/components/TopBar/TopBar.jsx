import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const TopBar = () => {
  const [userType, setUserType] = useState(null)
  const { user } = useContext(AuthContext)
  console.log(user);
  useEffect(() => {
      switch (user?.user?.userType) {

          case 'user':
          case 'doctor':
            case 'admin':
              setUserType(user?.user?.userType)
              break;
      }
  }, [])
  return (
    <div id="top-bar">
      <div className="container clearfix">
        <div className="row justify-content-between">
          <div className="col-12 col-md-auto d-none d-md-flex">
            <div className="top-links">
              <ul className="top-links-container">
                <li className="top-links-item">
                  <a href="#">
                    <i className="icon-phone3"></i> Contact Number
                  </a>
                </li>
                <li className="top-links-item">
                  <a href="#" className="nott">
                    <i className="icon-envelope2"></i> info@DataNexus.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {
            (userType === 'user') &&
            <div className="col-12 col-md-auto">
              <div className="top-links">
                <ul className="top-links-container">
                  <li className="top-links-item">
                    <a href="dashboard" className="bg-color text-white">
                      My Database
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }

          {
            (userType === 'doctor') && (user?.user?.approvedAt) &&
            <div className="col-12 col-md-auto">
              <div className="top-links">
                <ul className="top-links-container">
                  <li className="top-links-item">
                    <a href="dashboard" className="bg-color text-white">
                      my consultings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
           {
            (userType === 'doctor') && (user?.user?.approvedAt === null) &&
            <div className="col-12 col-md-auto">
              <div className="top-links">
                <ul className="top-links-container">
                  <li className="top-links-item">
                    <a href="CompleteProfile" className="bg-color text-white">
                      Complete your profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
           {
            (userType === 'admin') &&
            <div className="col-12 col-md-auto">
              <div className="top-links">
                <ul className="top-links-container">
                  <li className="top-links-item">
                    <a href="getalldoctors" className="bg-color text-white">
                      Users 
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TopBar;
