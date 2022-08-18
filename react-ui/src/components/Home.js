import "../styles/Home.css";
import ProfileButton from "./ProfileButton";

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

const Home = () => {
  return (
    <div>
      <div id="ProfileButton">
        <ProfileButton className="ProfileButton" />
      </div>
    </div>
  );
};

export default Home;
