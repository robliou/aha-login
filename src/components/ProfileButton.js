import Profile from "./Profile";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <Link
      to={{
        pathname: `/Profile`,
      }}
    >
      {" "}
      <button onClick={() => Profile()}> Dashboard</button>
    </Link>
  );
};

export default ProfileButton;
