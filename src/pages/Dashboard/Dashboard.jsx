import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";

const Dashboard = () => {
  const [userType, setUserType] = useState(null);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    switch (user?.user?.userType) {
      case "user":
      case "doctor":
      case "admin":
        setUserType(user?.user?.userType);
        console.log(userType);
        break;
    }
  }, []);
  return (
    <>
      {userType === null && <>Go away</>}
    </>
  );
};

export default Dashboard;
