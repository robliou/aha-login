import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <Link
      to={{
        pathname: `/Dashboard`,
      }}
    >
      {" "}
      <button onClick={() => Dashboard()}> Dashboard</button>
    </Link>
  );
};

export default ProfileButton;

/* Dashboard button component */
