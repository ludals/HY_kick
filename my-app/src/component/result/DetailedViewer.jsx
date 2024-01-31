import { useParams } from "react-router-dom";
import squad from "../../asset/squad.jpg"

import {
  RefereeWrapper,
  DetailInfoContainer,
  DetailInfoWrapper,
  DetailInfo
} from "./DetailedViewerStyle";

const DetailedViewer = () => {
  const matchID = useParams();

  //API 호출
  const ITEMS = ["득점", "슈팅", "유효슈팅", "코너킥", "오프사이드"];
  const Team1 = [1, 2, 3, 4, 5];
  const Team2 = [5, 4, 3, 2, 1];

  const showItems = (ITEMS) => {
    return (
      <section>
        {
          ITEMS.map((item) => {
            return (
              <div key={`${item}`}>{item}</div>
            );
          })
        }
      </section>
    );
  };

  const showTeam1Detail = (Team1) => {
    return (
      <section className="result">
        {
          Team1.map((content, index) => {
            return (
              <div className={Team1[index] < Team2[index] ? "lose" : ""}>
                {content}
              </div>
            )
          })
        }
      </section>
    );
  };

  const showTeam2Detail = (Team2) => {
    return (
      <section className="result">
        {
          Team2.map((content, index) => {
            return (
              <div className={Team2[index] < Team1[index] ? "lose" : ""}>
                {content}
              </div>
            )
          })
        }
      </section>
    );
  };

  return (
    <>
      <DetailInfoContainer>
        <DetailInfoWrapper>
          <DetailInfo>
            <RefereeWrapper>
              <div>Referee</div>
              <div>
                <img src="/image/gaebal.jpg" />
                <span>개발</span>
              </div>
            </RefereeWrapper>
            {showItems(ITEMS)}
            {showTeam1Detail(Team1)}
            {showTeam2Detail(Team2)}
          </DetailInfo>
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <img src={squad} />
        </DetailInfoWrapper>
      </DetailInfoContainer>
    </>
  );
}

export default DetailedViewer;