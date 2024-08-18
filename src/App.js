import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Database from "./pages/Database/Database";
import Signin from "./pages/Signin/Signin";
import RequiredAuth from "./RequiredAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notification from "./components/Notifications/Notifications";
import Footer from "./components/footer/Footer";
import SignUp from "./components/Dashboard/User/signUp/SingUp";
import DataEntryForm from "./pages/DataEntryForm/DataEntryForm";
import AppUpload from "./pages/AppUpload/AppUpload";
import UserManager from "./context/AuthContext"; 
import Profile from "./components/Dashboard/Doctor/profile/Profile";
import CreateResearchGroup from "./pages/createResearchGroup/CreateResearchGroup";
import MyResearchGroupsPage from "./pages/MyResearchGroups/MyResearchGroups";
import ResearchGroup from "./pages/ResearchGroup";
import UploadDataToRG from "./pages/upload data to a group/UploadDataToRG";
import DataEntryFormRG from "./pages/upload data to a group/UploadDataToRG";
import ContactForm from "./pages/ContactUs/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <UserManager> 
      <div className="App">
        <Header />
        <Routes>

            <Route path="/Database" element={<Database />} />
            <Route path="/DataEntryForm" element={<DataEntryForm />} />
            <Route path="/AppUpload" element={<AppUpload />} />
            <Route path="/*" element={<Dashboard />} />
            <Route path="/CreateResearchGroup" element={<CreateResearchGroup />} />
            <Route path="/MyResearchGroupsPage" element={<MyResearchGroupsPage />} />
            <Route path="/research-group/:groupId" element={<ResearchGroup />} />
            <Route path="research-group/:groupId/upload" element={<DataEntryFormRG />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="/About-us" element={<AboutUs />} />


           
            
            <Route path="/Profile" element={<Profile />} />
          <Route element={<RequiredAuth />}>
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Notification />
        <Footer />
      </div>
    </UserManager>
  );
}

export default App;
