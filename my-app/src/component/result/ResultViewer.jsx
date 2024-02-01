import {
  ResultWrapper,
  Dateform,
  Score,
  Place
} from "./ResultViewerStyle";
import TeamView from "../TeamView";
import { DAYS } from "../../constants/constant"

const ResultViewer = ({ match, width }) => {
  return (
    <ResultWrapper style={{ width: `${width}` }}>
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
      <Place>한양대학교<br /> 대운동장</Place>
    </ResultWrapper>
  );
};

export default ResultViewer;