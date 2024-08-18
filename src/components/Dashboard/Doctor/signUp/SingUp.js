// import "bootstrap/dist/css/bootstrap.css";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from '../SignUp/logon.png'
// import "./SignUp.css";

const DoctorSignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const usertyperef = useRef();

  

  const navigate = useNavigate();

  const register = async () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userType = "doctor"
    const passwordConfirmation = passwordConfirmationRef.current.value;
  

    if (!/^[A-Z][a-z]+ ([A-Z][a-z]+ ){0,2}([A-Z][a-z]+)$/.test(name)) {
      alert("Please Check The Name");
      return;
    }
    const response = await fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        userType: "doctor"
   
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.success) {
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } else {
      window.alert(json.messages[0]);
    }
  };

  return (
    <div class="container">
       <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="mt-0 mb-2">The Hypocratic Oath</h1>
            </div>
            <p style={{maxWidth:"500px"}}>I swear to fulfill, to the best of my ability and judgment, this covenant: I will respect the hard-won scientific gains of those physicians in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow.</p>

          </div>
        </div>
      </div>
      <img src="https://seeklogo.com/images/P/pharmacy-logo-4729C66E18-seeklogo.com.png" alt="logo" style={{maxWidth:"100px"}}/>
      <div class="row">
        <div class="col-12 col-sm-10  col-md-8  col-lg-6 ">
          <div
            style={{
              fontFamily: "Medium",
            }}
            class="SignUp my-5 p-5"
          >
            <div class="logo-img mb-4">
              {/* <img
              src={logo}
                className="img"
                alt="Hola"
              ></img> */}
            </div>
            <h1 class="SignUp-Title mb-4">Create Doctor Account:</h1>
            <div class="form-field mb-3">
              <label htmlFor="name" for="name" class="mb-2">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                class="form-control"
              ></input>
            </div>
            <div class=" mb-3">
              <label htmlFor="email" for="email" class="mb-2">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                class="form-control"
              ></input>
            </div>
            <div class="form-field mb-3">
              <label htmlFor="password" for="password" class="mb-2">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                class="form-control"
              ></input>
            </div>
            <div class="form-field mb-3">
              <label
                htmlFor="passwordConfirmation"
                for="passwordConfirmation"
                class="mb-2"
              >
                Password Confirmation
              </label>
              <input
                ref={passwordConfirmationRef}
                type="password"
                id="passwordConfirmation"
                class="form-control"
              ></input>
              
            </div>
           
      

            <div style={{
              marginBottom: "16px"
            }} class="row mt-5 align-items-center">
              
              <div class="col-5">
                <NavLink to={"/signin"} className={"w-100"}>
                  log in
                </NavLink>
              </div>
              <div class="col-7">
                <button onClick={register} className="ms-3 btn btn-bright cyan  bg-color text-white">
                  Register
                </button>
              </div>
            </div>
            <div class="col-7">
                <NavLink to={"/signup"} className={"w-100"}>
                 Are You A Patient? Click Here!
                </NavLink>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
