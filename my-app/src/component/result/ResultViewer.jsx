import {
  ResultWrapper,
  Dateform,
  Score,
  Place
} from "./ResultViewerStyle";
import { RefereeWrapper } from "./DetailedViewerStyle";
import TeamView from "../TeamView";
import { DAYS } from "../../constants/constant"

const ResultViewer = ({ match }) => {
  return (
    <ResultWrapper>
      <Dateform>
        {new Date(match.date).getMonth() + 1}월 {new Date(match.date).getDate()}일
        ({DAYS[new Date(match.date).getDay()]})
        <br />
        {match.time >= 12 ? "오후 " : "오전 "}
        {match.time >= 13 ? match.time % 12 : match.time}시
      </Dateform>
      <section>
        <TeamView teamName={'개발'} />
      </section>
      <Score>3</Score>
      <div className="versus">:</div>
      <Score>2</Score>
      <section>
        <TeamView teamName={'개발'} />
      </section>
      <RefereeWrapper>
        <div>Referee</div>
        <div>
          <img src="/image/gaebal.jpg" alt="" />
          <span>개발</span>
        </div>
      </RefereeWrapper>
    </ResultWrapper>
  );
};

export default ResultViewer;