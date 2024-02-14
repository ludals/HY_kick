import { useSelector } from "react-redux";
import styled from "styled-components";
import Upcoming from "../component/upcoming/Upcoming";
import Header from "../component/Header";
import Menu from "../component/home/Menu";
import { MARGIN_TOP } from "../constants/styleconstant";

const HomePage = () => {
  const matchData = useSelector((state) => state.match.value);
  sessionStorage.removeItem('curDate');

  return (
    <>
      <Header />
      <HomePageLayout>
        <Upcoming matches={matchData.match} />
        <Menu />
      </HomePageLayout>
    </>
  )

};

export default HomePage;

const HomePageLayout = styled.div`
  width: 100%;
  height: calc(100vh - ${MARGIN_TOP});
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-top: ${MARGIN_TOP};
`;