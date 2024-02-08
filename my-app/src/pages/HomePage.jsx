import { useSelector } from "react-redux";
import styled from "styled-components";
import Upcoming from "../component/upcoming/Upcoming";
import Menu from "../component/home/Menu";

const HomePage = () => {
  const matchData = useSelector((state) => state.match.value);
  sessionStorage.removeItem('curDate');

  return (
    <HomePageLayout>
      <Upcoming matches={matchData.match} />
      <Menu />
    </HomePageLayout>
  )

};

export default HomePage;

const HomePageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;