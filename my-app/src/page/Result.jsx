import styled from "styled-components";

import ResultViewer from "../component/result/ResultViewer";
import DetailedViewer from "../component/result/DetailedViewer";
import MomPlayer from "../component/result/MomPlayer";

const Result = () => {
  return (
    <RankingLayout>
      <ResultViewer />
      <MomPlayer />
      <DetailedViewer />
    </RankingLayout>
  );
};

export default Result;

const RankingLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;