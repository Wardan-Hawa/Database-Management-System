import { useState, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { AlertContex } from "../../../../context/AlertContex";

function CreateReport() {
  const navigate = useNavigate();

  const [drugs, setDrugs] = useState([
    {
      drugName: "",
      drugId: "",
      valid: false,
      checking: false,
    },
  ]);
  const { toggleOn } = useContext(AlertContex);

  const { token } = useContext(AuthContext);
  const notesRef = useRef(null);

  const checkDrug = async (index, drugName) => {
    const currentDrugs = [...drugs];
    currentDrugs[index].drugName = drugName;
    currentDrugs[index].checking = true;
    setDrugs(currentDrugs);
    const nameIsCorrect = await fetch(
      `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}&allsrc=1`
    );
    const json = await nameIsCorrect.json();
    const drugId = json?.idGroup?.rxnormId?.[0];

    setDrugs((prevDrugs) => {
      const cD = [...prevDrugs];
      cD[index].checking = false;
      if (drugId) {
        cD[index].drugId = drugId;
        cD[index].valid = true;
      } else {
        cD[index].drugId = "";
        cD[index].valid = false;
      }
      return cD;
    });
  };

  const addDrug = () => {
    const currentDrugs = [...drugs];
    currentDrugs.push({
      drugName: "",
      drugId: "",
      valid: false,
      checking: false,
    });
    setDrugs((pD) => currentDrugs);
  };

  const deleteDrug = (index) => {
    if (window.confirm("Delete drug?")) {
      const remainedDrugs = [...drugs];
      remainedDrugs.splice(index, 1);
      setDrugs((pD) => remainedDrugs);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let drugsList = [];
    for (const d of drugs) {
      drugsList.push(d.drugId);
      if (!d.valid) {
        toggleOn("Please enter valid drugs");
        return;
      }
    }
    const response = await fetch(`http://localhost:3000/api/v1/report/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        drugs: drugsList,
        notes: notesRef.current.value,
      }),
    });

    const json = await response.json();
    console.log(json.messages);
    console.log(json.success);

    toggleOn(json.messages, json.success);
    navigate("/my-reports");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="mt-0 mb-2">My Drugs List</h1>
            <p>Add your drugs here to create a drug interactions report</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="container-fluid">
          {drugs.map((drug, i) => {
            return (
              <div className="row mb-3 d-flex align-items-center" key={i}>
                <div className="col-9">
                  <input
                    type="text"
                    value={drug.drugName}
                    className={`form-control `}
                    placeholder="Drug Name ..."
                    onChange={(e) => checkDrug(i, e.target.value)}
                  />
                </div>
                <div className="col-1">
                  {drugs.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteDrug(i);
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
                <div className="col-2">
                  {drug.drugName.length > 0 && (
                    <>
                      {drug.checking ? (
                        <>
                          <span className="badge text-bg-warning">
                            Checking...
                          </span>
                        </>
                      ) : drug.valid ? (
                        <span className="badge text-bg-success">Valid</span>
                      ) : (
                        <span className="badge text-bg-danger">Invalid</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          <div className="row mb-4">
            <div className="col-9">
              <button type="button" className="btn btn-info" onClick={addDrug}>
                + Add Drug
              </button>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <textarea
                ref={notesRef}
                className="form-control"
                cols={10}
                placeholder="Notes"
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button type="submit" className="btn btn-success">
                Create Report
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateReport;
