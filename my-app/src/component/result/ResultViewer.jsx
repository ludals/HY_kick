import {
  ResultWrapper,
  Date,
  Score,
  Place
} from "./ResultViewerStyle";
import TeamView from "../TeamView";

const ResultViewer = () => {
  return (
    <ResultWrapper>
      <Date>1월 2일(월)<br /> 오후 12시</Date>
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