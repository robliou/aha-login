import "./../styles/footer.css";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <img className="aha-logo" alt="aha-logo" onClick={() => navigate("/")} />
    </footer>
  );
};

export default Footer;
