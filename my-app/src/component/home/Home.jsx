import Upcoming from "../upcoming/Upcoming"
import Schedule from "../schedule/Schedule";
import { useSelector } from "react-redux";

const Home = () => {
  const matchData = useSelector((state) => state.match.value);
  sessionStorage.removeItem('curDate');

  return (
    <>
      <Upcoming matches={matchData.match}></Upcoming>
      <Schedule></Schedule>
    </>
  );
};

export default Home;