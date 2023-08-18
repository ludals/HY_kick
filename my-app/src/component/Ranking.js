import Ranktable from "./Ranktable";
import { useState } from "react";


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
      <div>
        <nav>
          <div className = "tabs">
            <ul className = "tablist">
              <li onClick={() => changeTable("선봉리그")} className={isSunbong ? "active" : ""}>선봉리그</li>
              <li onClick={() => changeTable("공대리그")} className={(!isSunbong) ? "active" : ""}>공대리그</li>
            </ul>
          </div>
        </nav>
        <Ranktable>{leagueType}</Ranktable>
      </div>
   );
};
  
export default Ranking;
  