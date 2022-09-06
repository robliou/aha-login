import "./../styles/footer.css";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div id="onClickProp" onClick={() => navigate("/")}>
        <button className="aha-logo" alt="aha-logo" aria-label=" " />
      </div>
    </footer>
  );
};

export default Footer;
