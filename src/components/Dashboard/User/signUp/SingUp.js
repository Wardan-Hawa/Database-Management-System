import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const usertyperef = useRef();

  const navigate = useNavigate();

  const register = async () => {
    const username = nameRef.current.value.trim();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userType = "user";
    const passwordConfirmation = passwordConfirmationRef.current.value;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirmation: passwordConfirmation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
        const json = await response.json();
        if (json.error) {
          window.alert(json.error);
        } else {
          window.alert('An error occurred. Please try again.');
        }
        
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle unexpected errors (e.g., network issues)
      window.alert("An error occurred while registering. Please try again later.");
    }
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-10  col-md-8  col-lg-6 ">
          <div
            style={{
              fontFamily: "Medium",
            }}
            className="SignUp my-5 p-5"
          >
            
            <h1 className="SignUp-Title mb-4">Create User Account:</h1>
            <div className="form-field mb-3">
              <label htmlFor="name"  className="mb-2">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                id="Username"
                className="form-control"
              ></input>
            </div>
            <div className=" mb-3">
              <label htmlFor="email"  className="mb-2">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="form-control"
              ></input>
            </div>
            <div className="form-field mb-3">
              <label htmlFor="password"  className="mb-2">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="form-control"
              ></input>
            </div>
            <div className="form-field mb-3">
              <label
                htmlFor="passwordConfirmation"
                className="mb-2"
              >
                Password Confirmation
              </label>
              <input
                ref={passwordConfirmationRef}
                type="password"
                id="passwordConfirmation"
                className="form-control"
              ></input>
              
            </div>
           
      

            <div style={{
              marginBottom: "16px"
            }} className="row mt-5 align-items-center">
              
              <div className="col-5">
                <NavLink to={"/signin"} className={"w-100"}>
                  log in
                </NavLink>
              </div>
              <div className="col-7">
                <button onClick={register} className="ms-3 btn btn-bright cyan  bg-color text-white">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
