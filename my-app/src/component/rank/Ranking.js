import Ranktable from "./Ranktable";
import { useState } from "react";
import styled from "styled-components"


const Ranking = () => {

  const [leagueType, setLeagueType] = useState("선봉리그");
  const [isSunbong, setIsSunbong] = useState(true);

  function changeTable(lname){
    if(lname !== leagueType){
      setLeagueType(lname);
      if(lname !== "선봉리그")
        setIsSunbong(false);
      else
        setIsSunbong(true);
    }
  }

    return (
      <RankingWrapper>
        <TabWrapper>
          <nav>
            <div className = "tabs">
              <ul className = "tablist">
                <li onClick={() => changeTable("선봉리그")} className={isSunbong ? "active" : ""}>선봉리그</li>
                <li onClick={() => changeTable("공대리그")} className={(!isSunbong) ? "active" : ""}>공대리그</li>
              </ul>
            </div>
          </nav>
        </TabWrapper>
        <Ranktable>{leagueType}</Ranktable>
      </RankingWrapper>
   );
};
  
export default Ranking;

const RankingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
  
const TabWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  ul{
    padding: 0;
  }
  li{
    display: inline-flex;
    /* align-items: center; */
    justify-content: space-between;
    cursor: pointer;
    padding: 0.8rem 8rem;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: navy;
    background-color: #f5f2f5;
    border-radius: 5rem;
    letter-spacing: -.4px;
    transition: background-color .1s
  }
  li:is(.active,.is-active) {
    background-color: #fff;
    font-weight: 500;
    border: solid;
    border-width: 3px;
    border-color: #f5f2f5;
  }
`;