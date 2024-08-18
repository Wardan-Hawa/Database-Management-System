import Select from "react-select";
import makeAnimated from "react-select/animated";
import { MDBFile } from "mdb-react-ui-kit";
import React, { useRef } from "react";
import Form from "react-bootstrap/Form";

import "./style.css";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AlertContex } from "../../../../context/AlertContex";

const CompleteProfile = () => {
  const [specialities, setSpecialities] = useState([]);
  const [mySpecialities, setMySpecialities] = useState([]);
  const [louding, setLouding] = useState([]);
  const [metaValue, setMetaValue] = useState([]);

  const { toggleOn } = useContext(AlertContex);
  const fileRef = useRef(null);

  const { token } = useContext(AuthContext);
  let options = [];
  const getAllSpecialities = async () => {
    const res = await fetch(
      "http://localhost:3000/api/v1/users/specialities/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();

    setSpecialities(json.data);
  };
  const getUserInfo = async () => {
    setLouding(true);
    const res = await fetch("http://localhost:3000/api/v1/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json.data.user);
    setMySpecialities(json.data.user.Specialities);
    setLouding(false);
    json?.data?.user?.UserMeta.map((meta) => {
      console.log(meta);
      if (meta.metaKey === "certificates") {
        console.log(meta);
        setMetaValue(meta.metaValue);
      }
    });
  };
  useEffect(() => {
    getAllSpecialities();
    getUserInfo();
  }, []);

  const animatedComponents = makeAnimated();
  options = [
    specialities.length > 0 &&
      specialities.map((specialitie, i) => {
        return { value: specialitie.name, label: specialitie.name };
      }),
  ];

  const options1 = [
    "Allergy and Immunology",
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Gastroenterology",
    "Geriatrics",
    "Gynecology and Obstetrics",
    "Hematology",
    "Infectious Diseases",
    "Internal Medicine",
    "Neurology",
    "Oncology",
    "Ophthalmology Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  options = options[0];

  const handleSelect = async () => {
    let indexes = [];

    for (let i = 0; i < selectedOptions.length; i++) {
      const option = selectedOptions[i].label;
      const index = options1.findIndex((o) => o === option);
      console.log(`Selected option ${option} found at index ${index}`);
      indexes.push(index);
    }
    const incrementedNumbers = indexes.map((number) => number + 1);

    console.log(incrementedNumbers);

    const res = await fetch(
      "http://localhost:3000/api/v1/users/specialities/",
      {
        method: "POST",
        body: JSON.stringify({ specialityId: incrementedNumbers }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    toggleOn(json.messages, json.success);
  };

  const createCertificates = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch("http://localhost:3000/api/v1/users/certificates", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    toggleOn(json.messages, json.success);
  };
  

  return (
    <>
       <div className="container-fluid mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="mt-0 mb-2">Complete your profile</h1>
            </div>
            <p>
              upload your cerdintials to be able to work with.
            </p>
          </div>
        </div>
      </div>
      
    
      
    <div>
      <form onSubmit={createCertificates} method="POST">
        <div className="min">
        <div className="container-fluid mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="name">Certificate Name</label>
            </div>
            <input
                    className="input form-control"
                  
                    placeholder="e.g. PhD. Oncology"
            id="certificateName[0]"
            type="text"
            name="certificateName[0]"
            value={metaValue[0]?.certificateName}
            onChange={(e) => {
              setMetaValue({
                ...metaValue[0],
                certificateName: e.target.value[0],
              });
            }}
          />
          </div>
        </div>
      </div>
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="email">University Name</label>
            </div>
                  <input
                     className="input form-control"
                  
                     placeholder="e.g. Harvard University"
            
            id="universityName[0]"
            type="text"
            name="universityName[0]"
            value={metaValue[0]?.universityName}
            onChange={(e) => {
              setMetaValue({
                ...metaValue[0],
                universityName: e.target.value,
              });
            }}
          />
          </div>
        </div>
      </div>
        
            




      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="email">Certificate</label>
            </div>
                  <input
                    className="input form-control"
                  
           ref={fileRef}
           id="certificate[0]"
          type="file"
          name="certificate[0]"
                  />
                  <button
                    
            className=" ms-3 btn btn-bright cyan bg-color text-white"
            style={{ margin: "10px" }}
            type="submit"
          >
            submit
          </button>
          </div>
        </div>
            </div>
            


        
        </div>
        </form>
        

        <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
            <label htmlFor="email">What are you specialized in?</label>
            </div>
            {!louding ? (
          <Select
            defaultValue={mySpecialities.map((mySpecialitie, i) => {
              return { value: mySpecialitie.name, label: mySpecialitie.name };
            })}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={(item) => setSelectedOptions(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />
        ) : (
          <p>Loading...</p>
        )}
         <button
          className=" ms-3 btn btn-bright cyan  bg-color text-white"
          onClick={handleSelect}
          style={{ margin: "10px" }}
        >
          submit
        </button>
          </div>
        </div>
        </div>
        

       
      
      </div>
      </>
  );
};

export default CompleteProfile;
