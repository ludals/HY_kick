import "./Ranktable.css"

function Ranktable({children}){
    if(children === "선봉리그"){
        console.log("a");
    }
    return(
        <>
            <h2 className = "league-type">{children}</h2>
            <table>
            <thead className = "league-table">
                <tr>
                    <th className = "league-table-header-pos" scope = "col">
                    <div>Position</div>
                    </th>
                    <th className = "league-table-header-team" scope = "col">
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
                <tr>
                    <td>1</td>
                    <td>메풍</td>
                    <td>12</td>
                    <td>5</td>
                    <td>4</td>
                    <td>0</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>전사</td>
                    <td>10</td>
                    <td>6</td>
                    <td>3</td>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>SOCC3</td>
                    <td>7</td>
                    <td>5</td>
                    <td>2</td>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>개발</td>
                    <td>6</td>
                    <td>4</td>
                    <td>2</td>
                    <td>0</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>알싸</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>개발</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>개발</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
            </table>
            

        </>
    );
}

export default Ranktable;