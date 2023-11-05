import Ranking from "../rank/Ranking";
import Upcoming from "../upcoming/Upcoming"
// import Schedule from "../schedule/Schedule";

const Home = () => {
    return(
        <>
            <Upcoming></Upcoming>
            <Ranking></Ranking>
            {/* <Schedule></Schedule> */}
        </>
    );
};

export default Home;