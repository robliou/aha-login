import "./../styles/footer.css";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <object
        className="aha-logo"
        alt="aha-logo"
        onClick={() => navigate("/")}
        onerror="this.style.display='none'"
      />
    </footer>
  );
};

export default Footer;
