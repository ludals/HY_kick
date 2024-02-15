import { useSelector } from "react-redux";
import styled from "styled-components";
import Upcoming from "../component/upcoming/Upcoming";
import Header from "../component/Header";
import Menu from "../component/home/Menu";
import { MARGIN_TOP } from "../constants/styleconstant";
import UpcomingCard from "../component/upcoming/UpcomingCard";

const HomePage = () => {
  const matchData = useSelector((state) => state.match.value);
  sessionStorage.removeItem('curDate');

  return (
    <>
      {/* <Header /> */}
      <HomePageLayout>
        {/* <Upcoming matches={matchData.match} /> */}
        <Menu />
        <UpcomingCard matches={matchData.match} />
      </HomePageLayout>
    </>
  )

};

export default HomePage;

const HomePageLayout = styled.div`
  width: 100%;
  height: calc(100vh - ${MARGIN_TOP});
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: ${MARGIN_TOP};
  overflow: hidden;
`;