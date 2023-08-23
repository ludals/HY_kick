import "./Ranktable.css"
import teams from "./teams.json"

function Ranktable({children}){
    const teamDatas = (children === "선봉리그" ? teams.sunbong : teams.gongde);

    return(
        <>
            <h2 className = "league-type">{children}</h2>
            <table>
                    <thead className = "league-table">
                        <tr>
                            <th className = "league-table-pos-header" scope = "col">
                            <div>Rank</div>
                            </th>
                            <th className = "league-table-team-header" scope = "col">
                            <div>club</div>
                            </th>
                            <th scope = "col">
                            <div>Points</div>
                            </th>
                            <th scope = "col">
                            <div>Played</div>
                            </th>
                            <th scope = "col">
                            <div>Won</div>
                            </th>
                            <th scope = "col">
                            <div>Drawn</div>
                            </th>
                            <th scope = "col">
                            <div>Lost</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className = "league-table">
                        {teamDatas.map((teamData, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{teamData.name}</td>
                                <td>{teamData.points}</td>
                                <td>{teamData.played}</td>
                                <td>{teamData.win}</td>
                                <td>{teamData.lose}</td>
                                <td>{teamData.draw}</td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>
        </>
    );
}

export default Ranktable;