import { AuthContext } from "../../../../context/AuthContext";
import { AlertContex } from "../../../../context/AlertContex";

import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const GetDoctors = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const navigate = useNavigate();

  const [dogtors, setDogtors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [filteredDogtors, setFilteredDogtors] = useState([]);
  const getaAllDoctors = async (e) => {
    const res = await fetch("http://localhost:3000/api/v1/users/getDoctors", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json.data.user);
    setDogtors(json.data.user);
    setFilteredDogtors(json.data.user);
  };

  const approveDoctor = async (doctor) => {
    if (window.confirm("Are You Sure?")) {
      if (!doctor.approvedAt) {
        const res = await fetch(
          `http://localhost:3000/api/v1/users/approve/${doctor.id}	`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        console.log(json);
        if (json.success) {
          toggleOn(json.messages, json.success);
          const index = dogtors?.findIndex(
            (singleDoctor) => singleDoctor.id == doctor.id
          );
          setFilteredDogtors((prev) => {
            const approveDoctor = { ...doctor, approvedAt: new Date() };
            const newDoctors = [...prev];
            newDoctors[index] = approveDoctor;
            return newDoctors;
          });
        }
      } else toggleOn("doctor alredy approved");
    }
  };
  useEffect(() => {
    getaAllDoctors();
  }, []);

  // useEffect(() => {
  //   getaAllDoctors();
  // },[approveDoctor]);

  const selectingDoctortId = (id) => {
    <Link to={`/getdoctors/${id}`}></Link>;

    navigate(`/getdoctors/${id}`);
    console.log(id);
  };
  console.log(dogtors);

  return (
    <>
      <div className="d-flex mb-3">
        <select
          className="form-select me-3"
          aria-label="Select speciality"
          value={selectedSpeciality}
          onChange={(e) => setSelectedSpeciality(e.target.value)}
        >
          <option value="">All Specialities</option>
          <option value="Allergy and Immunology">Allergy and Immunology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Emergency Medicine">Emergency Medicine</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Geriatrics">Geriatrics</option>
          <option value="Gynecology and Obstetrics">
            Gynecology and Obstetrics
          </option>
          <option value="Hematology">Hematology</option>
          <option value="Infectious Diseases">Infectious Diseases</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Neurology">Neurology</option>
          <option value="Oncology">Oncology</option>
          <option value="Ophthalmology Orthopedics">
            Ophthalmology Orthopedics
          </option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Radiology">Radiology</option>
          <option value="Rheumatology">Rheumatology</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (selectedSpeciality) {
              const filtered = dogtors.filter(
                (dogtor) =>
                  dogtor.Specialities.find(
                    (speciality) => speciality.name === selectedSpeciality
                  ) !== undefined
              );
              setFilteredDogtors(filtered);
            } else {
              setFilteredDogtors(dogtors);
            }
          }}
        >
          Filter
        </button>
      </div>

      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Position</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredDogtors?.length > 0 &&
            filteredDogtors.map((doctor, i) => {
              console.log(doctor);

              return (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      {doctor?.UserMeta.map((meta) => {
                        console.log(meta);
                        if (meta.metaKey === "avatar") {
                          return (
                            <img
                              src={meta.metaValue}
                              alt="doctor"
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                          );
                        }
                      })}
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{doctor?.name}</p>
                        <p className="text-muted mb-0">{doctor?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">
                      {doctor?.Specialities[0]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[1]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[2]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[3]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[4]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[5]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[6]?.name}
                    </p>
                    <p className="text-muted mb-0">
                      {doctor?.Specialities[7]?.name}
                    </p>
                  </td>
                  <td>
                    {!doctor.approvedAt ? (
                      <MDBBadge color="danger" pill>
                        Not active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="success" pill>
                        active
                      </MDBBadge>
                    )}
                  </td>
                  <td>Senior</td>
                  <td>
                    <button
                      className=" ms-3 btn btn-success"
                      onClick={() => approveDoctor(doctor)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })}
          {dogtors?.length > 0 && dogtors.map((dogtor, i) => {})}
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default GetDoctors;
