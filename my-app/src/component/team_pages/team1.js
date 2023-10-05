import "./team1.css"
import logo from '../team_image/gaebal.jpg'

const Team1 = () => {
  return (
    <>
            <div className="text_team_name">팀페이지</div>
            <div className="big_container">
              <div className="container1">
                <div className="image_box">
                  <img className="image_team_logo" src={logo} alt="gaebal"/>
                </div>
                <div className="container1_col">
                  <div className = "container1_textrow">
                    <div className = "text_team_name">개발</div>
                    <div className = "text_team_name_eng">gaebal</div>
                  </div>
                  <div className = "text_team_info">리그: 선봉리그</div>
                  <div className = "text_team_info">순위: 1위</div>
                </div>
                
              </div>
              <div className = "container2">
                <div className = "container2_left">
                  <div className="box1">
                    <div className = "text_detail_info">경기수: 2 /  승: 1 무: 0 패: 1</div>
                  </div>
                  <div className = "box2">*Top 3 or 5 득점순위 json파일 받아서 표 만들기</div>
                  </div> 
                <div className = "container2_right">다가오는일정</div>
              </div>
            </div>
        </>

  );
}


export default Team1;
