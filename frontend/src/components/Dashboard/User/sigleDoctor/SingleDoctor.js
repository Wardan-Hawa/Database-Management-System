import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import Avatar from "@mui/material/Avatar";

const SingleDoctor = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState("  ");

  const dotor = async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/users/getDoctors/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);
    setData(json?.data?.doctor);
    console.log(json?.data?.doctor.UserMeta);
  };
  useEffect(() => {
    dotor();
  }, []);
  return (
    <div className="">
      <div className="">
        <div>
          {data?.UserMeta?.map((meta) => {
            if (meta.metaKey === "avatar") {
              console.log(meta.metaValue);
              return (
                <Avatar
                  className="avatar"
                  style={{
                    width: 100,
                    height: 100,
                    margin: "0 0 15px 42%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  alt="Remy Sharp"
                  src={meta.metaValue}
                  // src={data?.UserMeta && data?.UserMeta[0]?.metaValue}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="text-center">
        <h1>{data.name}</h1>
      </div>
      <div className="mb-5">
        <h4 className="mb-3">Specialities</h4>
        {data.Specialities?.length > 0 &&
          data.Specialities.map((Specialitie, i) => {
            return <li className="fw-normal mb-1">{Specialitie.name}</li>;
          })}
      </div>
      <div>
        
      <h4 className="mb-3">Certificates</h4>
        {data?.UserMeta?.map((meta, mi) => {
          if (meta?.metaKey === "certificates") {
            return (
                <li key={mi}> {meta?.metaValue[0]?.certificateName} ({meta?.metaValue[0]?.universityName})</li>
            );
          }
          else {
            return <Fragment key={mi}></Fragment>
          }
        })}
      </div>
    </div>
  );
};

export default SingleDoctor;
