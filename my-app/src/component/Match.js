import "./Match.css"
import logo from './team_image/gaebal.jpg'

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

const Match = (props) => {
    const game = props.data.filter(m => m.date === formatDateToYYYYMMDD(props.date));
    console.log(game);

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
                {game[0].date}
            </div>
            <div className="info">
                한양대학교 대운동장
            </div>
        </>
    );
};

export default Match;