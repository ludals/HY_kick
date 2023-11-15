import Ranking from "../rank/Ranking";
import Calender from "../schedule/Calender";
import Upcoming from "../upcoming/Upcoming"
// import Schedule from "../schedule/Schedule";

const Home = () => {
    return(
        <>
            <Upcoming></Upcoming>
            <Ranking></Ranking>
            {/* <Schedule></Schedule> */}
            <Calender></Calender>
        </>
    );
};

export default Home;