import Ranking from "../rank/Ranking";
import Upcoming from "../upcoming/Upcoming"
import Schedule from "../schedule/Schedule";
import { useSelector } from "react-redux";

const Home = () => {
    const matchData = useSelector((state) => state.match.value);
    return(
        <>
            <Upcoming matches={matchData.match}></Upcoming>
            <Ranking></Ranking>
            <Schedule></Schedule>
        </>
    );
};

export default Home;