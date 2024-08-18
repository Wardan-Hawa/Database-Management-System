// import "bootstrap/dist/css/bootstrap.css";
import { useContext, useEffect, useState, useRef, Fragment } from "react";
import "./Profile.css";
import { AuthContext } from "../../../../context/AuthContext";
import Layout from "../../../layout/Layout";
import { AlertContex } from "../../../../context/AlertContex";
import Avatar from "@mui/material/Avatar";
import { AiOutlineCamera } from "react-icons/ai";
import CompleteProfile from "../CompleteProfile/CompleteProfile";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const fileRef = useRef(null);
  const [data, setUserData] = useState({});
  const [img, setImg] = useState("  ");
  const updateProfile = async (e) => {
  e.preventDefault();
  const form = document.querySelector('form');
  const NewInfo = new FormData(form);
  const formToData = {};
  for (var key of NewInfo.keys()) {
    formToData[key] = NewInfo.get(key);
  }
  const response = await fetch("http://localhost:3000/api/v1/users/me", {
    method: "put",
    body: JSON.stringify(formToData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": " application/json",
    },
  });
  const json = await response.json();
  if (json.success) {
    toggleOn(json.messages, json.success);
  }
};

  const getUser = async () => {
    const res = await fetch("http://localhost:3000/api/v1/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    setUserData(json.data.user);
  };
  const avtar = async () => {
    data.UserMeta.map((meta) => {
      if (meta.metaKey === "avatar") {
        setImg(meta.metaValue);
      }
    });
  };
 
  // const updateAvatar = async (e) => {
  //   console.log(e.target.files[0]);
  //   const imageFromData = new FormData();
  //   imageFromData.append(`image`, e.target.files[0]);
  //   const res = await fetch("http://localhost:3000/api/v1/users/avatar", {
  //     method: "POST",
  //     // body: formdata ,
  //     headers: {
  //       Accept: `apleacoin/json`,
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: imageFromData,
  //   });
  //   const json = await res.json();

  //   console.log(json.data);
  //   toggleOn(json.messages, json.success);
  //   setImg(json?.data?.avatar?.metaValue);
  // };
  // useEffect(() => {
  //   getUser();
  // }, [updateAvatar]);
  // useEffect(() => {
  //   avtar();
  // }, [getUser]);
  
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="all">
          <div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                border: "1px solid #f3f4f5",
                justifyContent: "space-between",

                padding: "10px 15px",
                fontFamily: "Medium",
              }}
            >
              <h2>Profile</h2>
            </div>
            <div
              style={{
                border: "1px solid #f3f4f5",
                fontFamily: "Medium",
                display: "flex",
                flexDirection: "column",
              }}
              className="p-3 mb-4"
            >
              <div className="info mb-4">My Information</div>

              <div className="form1">
                <form onSubmit={updateProfile}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                      borderBottom: "1px solid #f2f3f4",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      {/* <input
                        id="image"
                        type="file"
                        name="image"
                        ref={fileRef}
                        onChange={updateAvatar}
                        style={{
                          display: `none`,
                        }}
                      /> */}

                      {/* <div className="person-avatar">
                        <AiOutlineCamera
                          className="icon"
                          onClick={() => fileRef.current.click()}
                        />

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
                          src={img}
                          alt="Remy Sharp"
                        />
                      </div> */}
                      <label htmlFor="name">
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="name"
                        type="text"
                        className="inputstyle"
                        name="name"
                        value={data.name}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            name: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="email">
                        Email Adress <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="email"
                        type="text"
                        name="email"
                        className="inputstyle"
                        value={data.email}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            email: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="password">
                        Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        className="inputstyle"
                        value={data.password}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            password: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="newpassword"> New Password</label>
                      <input
                        id="newpassword"
                        type="password"
                        name="new_password"
                        className="inputstyle"
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            newpassword: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="newpasswordconf">
                        New Password Confirmation
                      </label>
                      <input
                        id="newpasswordconf"
                        type="password"
                        className="inputstyle"
                        name="new_password_confirmation"
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            newpasswordconf: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <input type="hidden" name="_method" value="put" />
                    <button
                      style={{
                        display: "flex",
                        flexDirection: "flex-start",
                        width: "25%",
                      }}
                      className="ms-3 btn btn-bright cyan  bg-color text-white"
                      type="submit"
                      value="Update Information"
                    >
                      update profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
