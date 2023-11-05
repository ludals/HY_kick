import React, {useState} from "react";
import "./Match.css"
import logo from '../team_image/gaebal.jpg'


const Match = (props) => {

    const [gameNum, setGameNum] = useState(1);
    const [isFirst, setIsFirst] = useState(true);

    const game = props.data.filter(m => m.date === props.date);
    if(game.length === 0)
        return null;
      
    function changeMatch(gnum){
        if(gnum !== gameNum){
          setGameNum(gnum);
            if(gnum !== 1)
                setIsFirst(false);
            else
                setIsFirst(true);
        }
    }

    const matchinfo = () => {
        if(isFirst){
            return(
                <>
                    <div className="title">공대스리가</div>
                    <div className="match-container">
                        <img className="home-team" src={logo} alt="gaebal"/>
                        <div className="name">{game[0].home}</div>
                        <div className="vs">vs</div>
                        <div className="name">{game[0].away}</div>
                        <img className="away-team" src={logo} alt="gaebal"/>
                    </div>
                    <div className="info">
                        {game[0].date + " " + game[0].time + "시"}
                    </div>
                    <div className="info">
                        한양대학교 대운동장
                    </div>
                </>
            );
        }
        else{
            return(
                <>
                    <div className="title">공대스리가</div>
                    <div className="match-container">
                        <img className="home-team" src={logo} alt="gaebal"/>
                        <div className="name">{game[1].home}</div>
                        <div className="vs">vs</div>
                        <div className="name">{game[1].away}</div>
                        <img className="away-team" src={logo} alt="gaebal"/>
                    </div>
                    <div className="info">
                        {game[1].date + " " + game[1].time + "시"}
                    </div>
                    <div className="info">
                        한양대학교 대운동장
                    </div>
                </>
            );
        }
    }
      
    return (
        <div className="tabbedContent">
             <nav>
                <div className = "tabs">
                    <ul className = "tablist">
                        <li onClick={() => changeMatch(1)} className={isFirst ? "active" : ""}>1경기</li>
                        <li onClick={() => changeMatch(2)} className={(!isFirst) ? "active" : ""}>2경기</li>
                    </ul>
              </div>
            </nav>
            {matchinfo()}
        </div>
    );

    // return(
    //     <>
    //         <div className="title">공대스리가</div>
    //         <div className="match-container">
    //             <img className="home-team" src={logo} alt="gaebal"/>
    //             <div className="name">{game[0].home}</div>
    //             <div className="vs">vs</div>
    //             <div className="name">{game[0].away}</div>
    //             <img className="away-team" src={logo} alt="gaebal"/>
    //         </div>
    //         <div className="info">
    //             {game[0].date}
    //         </div>
    //         <div className="info">
    //             한양대학교 대운동장
    //         </div>
    //     </>
    // );
};

export default Match;