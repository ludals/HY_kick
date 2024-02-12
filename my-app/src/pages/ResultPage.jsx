import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResultViewer from "../component/result/ResultViewer";
import DetailedViewer from "../component/result/DetailedViewer";
import ResultSlide from "../component/result/ResultSlide";
import MomPlayer from "../component/result/MomPlayer";

const ResultPage = () => {
  const param = useParams();
  const matches = useSelector((state) => state.match.value).match;
  const matchID = parseInt(param.id);
  const match = matches.filter(match => matchID === match.id);

  return (
    <RankingLayout>
      <ResultViewer match={match[0]} />
      <MomPlayer />
      {/* <DetailedViewer /> */}
      <ResultSlide/>
    </RankingLayout>
  );
};

export default ResultPage;

const RankingLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;