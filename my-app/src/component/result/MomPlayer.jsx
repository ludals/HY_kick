import { MomPlayerWrapper } from "./MomPlayerStyle";

const MomPlayer = () => {
  return (
    <MomPlayerWrapper>
      <div className="title">Man of the Match</div>
      <section>
        <img src="/image/crown.png" alt="" />
        <span className="mom">이유상</span>
        <span className="mom">(개발)</span>
      </section>
    </MomPlayerWrapper>
  );
};

export default MomPlayer;