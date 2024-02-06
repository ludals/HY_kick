import { useParams } from "react-router-dom";

import {
  showItems,
  showTeam1Detail,
  showTeam2Detail,
  RefereeWrapper,
  DetailInfoContainer,
  DetailInfoWrapper,
  DetailInfo
} from "./DetailedViewerStyle";
import { RESULT_ITEMS } from "../../constants/constant";

const DetailedViewer = () => {
  // const matchID = useParams();

  //API 호출
  const Team1 = [1, 2, 3, 4, 5];
  const Team2 = [5, 4, 3, 2, 1];

  return (
    <>
      <DetailInfoContainer>
        <DetailInfoWrapper>
          <DetailInfo>
            <RefereeWrapper>
              <div>Referee</div>
              <div>
                <img src="/image/gaebal.jpg" alt="" />
                <span>개발</span>
              </div>
            </RefereeWrapper>
            {showItems(RESULT_ITEMS)}
            {showTeam1Detail(Team1, Team2)}
            {showTeam2Detail(Team1, Team2)}
          </DetailInfo>
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <img src="/image/squad.jpg" alt="" />
        </DetailInfoWrapper>
      </DetailInfoContainer>
    </>
  );
}

export default DetailedViewer;