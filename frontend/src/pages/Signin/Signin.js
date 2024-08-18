import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const signIn = async () => {
    console.log("Sign-in function called"); // Debugging point

    try {
      const account = emailRef.current.value;
      const password = passwordRef.current.value;

      console.log("Email:", account);
      console.log("Password:", password);

      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          account,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log("API Response:", json);
        console.log("API Response Status:", response.status);


        authCtx.signIn(json.data.user, json.data.token);
        navigate("/");
      } else {
        const errorData = await response.json();
        window.alert(errorData.messages[0]);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div
            style={{
              fontFamily: "Medium",
            }}
            className="Sign-in my-5 p-5"
          >
            <h1 className="login-title mb-4">Login</h1>
            <div className="form-field mb-3">
              <label htmlFor="email" className="mb-2">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="row mt-5 align-items-center">
              <div className="col-5">
                <NavLink to={"/"}>Sign Up Now!</NavLink>
              </div>
              <div className="col-7">
                <button
                  onClick={signIn}
                  className="ms-3 btn btn-bright cyan bg-color text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
