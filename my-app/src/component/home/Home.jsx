import Ranking from "../rank/Ranking";
import Upcoming from "../upcoming/Upcoming"
import Schedule from "../schedule/Schedule";
import matches from "../matches.json"
import teams from "../teams.json"
import { useDispatch, useSelector } from "react-redux";
import { load_match } from "../../redux/match";
import { load_ranking } from "../../redux/ranking"

const Home = () => {
    const match = useSelector((state) => state.match.value);
    const ranking = useSelector((state) => state.ranking.value)
    const dispatch = useDispatch();
    dispatch(load_match(matches.match));
    dispatch(load_ranking(teams));
    console.log(match);
    console.log(ranking);
    return(
        <>
            <Upcoming></Upcoming>
            <Ranking></Ranking>
            <Schedule></Schedule>
        </>
    );
};

export default Home;