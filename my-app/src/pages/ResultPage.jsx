import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResultViewer from "../component/result/ResultViewer";
import DetailedViewer from "../component/result/DetailedViewer";
import ResultSlide from "../component/result/ResultSlide";
import MomPlayer from "../component/result/MomPlayer";
import { MARGIN_TOP } from "../constants/styleconstant";
import Header from "../component/Header";

const ResultPage = () => {
  const param = useParams();
  const matches = useSelector((state) => state.match.value.match.match);
  const matchID = parseInt(param.id);
  const match = matches.filter(match => matchID === match.id)[0];

  return (
    <>
      <Header />
      <RankingLayout>
        <ResultViewer match={match} />
        <MomPlayer />
        {/* <DetailedViewer /> */}
        <ResultSlide />
      </RankingLayout>
    </>
  );
};

export default ResultPage;

const RankingLayout = styled.div`
  width: 100%;
  margin-top: ${MARGIN_TOP};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;