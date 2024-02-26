import { useSelector } from "react-redux";
import styled from "styled-components";
import Upcoming from "../component/upcoming/Upcoming";
import Header from "../component/Header";
import Menu from "../component/home/Menu";
import { MARGIN_BOTTOM, MARGIN_TOP } from "../constants/styleconstant";
import UpcomingCard from "../component/upcoming/UpcomingCard";
import MyTeam from "../component/home/MyTeam";

const HomePage = () => {
  const user = useSelector((state) => state.user.value);
  const matchData = useSelector((state) => state.match.value);
  sessionStorage.removeItem('curDate');
  localStorage.removeItem('register');

  console.log(user);
  return (
    <>
      <Header />
      <HomePageLayout>
        {/* <Upcoming matches={matchData.match} /> */}
        <MyTeam />
        <Menu />
        {/* <UpcomingCard matches={matchData.match} /> */}
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
  box-sizing: border-box;
  margin-top: ${MARGIN_TOP};
  padding-bottom: ${MARGIN_BOTTOM};
  overflow: hidden;
`;