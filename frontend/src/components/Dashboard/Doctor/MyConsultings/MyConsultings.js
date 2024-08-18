import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import * as dayjs from "dayjs";
import { NavLink, useNavigate } from "react-router-dom";

const Myconsultings = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user.user.userType);
  const [consultings, setConsultings] = useState([]);
  let userType;
  userType = user.user.userType;

  console.log(userType);

  
  const consulting = async () => {
    let url;
  url = userType == `doctor`
      ? "http://localhost:3000/api/v1/consulting/"
      : "http://localhost:3000/api/v1/consulting/user"; 
console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);

    setConsultings(json.data);
  };

  const deleteconsulting = async (id) => {
    console.log(id);
    if (window.confirm("Are You Sure?")) {
    const res = await fetch(`http://localhost:3000/api/v1/consulting/${id}	`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    
    if (json.message) {
     
        const newConsultings = [...consultings];
        const index = newConsultings.findIndex(
          (consulting) => consulting.id === id
        );
        newConsultings.splice(index, 1);
        setConsultings(newConsultings);
      }
    }
  };
  useEffect(() => {
    consulting();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="mt-0 mb-2">My consultings</h1>
            </div>
            <p>
              Here you will find a list of the patients to offer them
              consulting.
            </p>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>
              {userType === "doctor" ? " Patient's name" : " Doctor's name"}{" "}
            </th>
            <th>Notes</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {consultings.map((consulting) => (
            <tr key={consulting.id}>
              <td style={{ maxWidth: "200px" }}>
                <p className="m-0 py-1">
                  {userType === "doctor"
                    ? consulting?.Report?.User?.name
                    : consulting?.User?.name}
                </p>
              </td>
              <td>{consulting?.Report?.notes}</td>
              <td>{dayjs(consulting.createdAt).format("YYYY-MM-DD")}</td>
              <td>
                <button
                  className=" ms-3 btn btn btn-warning"
                  onClick={() => navigate(`MyReports/${consulting.Report.id}`)}
                >
                  info
                </button>
                <button
                  className=" ms-3 btn btn-bright cyan  bg-color text-white"
                  onClick={() => navigate(`${consulting.id}`)}
                >
                  Message
                </button>
                <button
                  className=" ms-3 btn btn-danger"
                  onClick={() => deleteconsulting(consulting.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Myconsultings;
