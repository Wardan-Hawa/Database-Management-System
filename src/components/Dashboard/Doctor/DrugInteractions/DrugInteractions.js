import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { AlertContex } from "../../../../context/AlertContex"

import "bootstrap/dist/css/bootstrap.min.css";

function DrugInteractions() {
  const [drugs, setDrugs] = useState([
    {
      drugName: "",
      drugId: "",
      valid: false,
      checking: false,
    },
  ]);

  const [interactions, setInteractions] = useState([]);

  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex)

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
        toggleOn("Please enter valid drugs"  )
        
        return;
      }
    }

    const drugIds = await Promise.all(
      drugs.map(async (drugs) => {
        const response = await fetch(
          `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugs.drugName}&allsrc=1`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        return json.idGroup.rxnormId[0];
      })
    );

    const response = await fetch(
      `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${drugIds.join(
        "+"
      )}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const drugBankResponse = await response.json();

    const fullIntType =
      drugBankResponse?.fullInteractionTypeGroup?.[0]?.fullInteractionType;

    if (Array.isArray(fullIntType)) {
      const interactions = [];
      fullIntType.forEach(async (intType) => {
        const { minConcept = [] } = intType;
        let name = "";
        minConcept.forEach((concept) => {
          name += "(" + concept.name + "/" + concept.rxcui + ") - ";
        });
        name = name.substring(0, name.length - 3);
        const comment = intType?.comment;

        if (Array.isArray(intType?.interactionPair)) {
          intType?.interactionPair.forEach(async (intPair) => {
            const severity = intPair?.severity;
            const description = intPair?.description;
            interactions.push({ name, comment, severity, description });
          });
        } else {
          interactions.push({ name, comment });
        }
      });
      setInteractions(interactions);
    } else {
      setInteractions([]);
    }
    console.log(Object.keys(interactions));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="mt-0 mb-2">Drug interactions</h1>
            <p>
              Add a list of drugs here to check for possible drug interactions
            </p>
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
          <div className="row mt-4">
            <div className="col">
              <button type="submit" className="btn btn-success">
                Check for interactions
              </button>
              {(interactions.length > 0) &&
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name/Id</th>
                      <th>Description</th>
                      <th>Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interactions.map((interaction, i) => (
                      <tr>
                        <td>{interaction.name}</td>
                        <td>{interaction.description}</td>
                        <td>{interaction.severity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default DrugInteractions;
