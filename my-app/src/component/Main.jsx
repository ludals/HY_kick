import { NavLink, Outlet } from "react-router-dom";

const Main = () => {

  const styles = ({ isActive }) => {
    return {
      color: isActive ? "red" : "black",
      fontWeight: isActive ? "bold" : "normal"
    };
  };

  return (
    <div>
      {/* <nav>
        <ul>
          <li> 
            <NavLink style={styles} to="/home">
              홈
            </NavLink>
          </li>
          <li> 
            <NavLink style={styles} to="/login">
              로그인
            </NavLink>
          </li>
          <li> 
            <NavLink style={styles} to="/register">
              회원가입
            </NavLink>
          </li>
          <li>
            <NavLink style={styles} to="/ranking">
              순위
            </NavLink>
          </li>
          <li>
            <NavLink style={styles} to="/schedule">
              스케줄
            </NavLink>
          </li>
          <li>
            <NavLink style={styles} to="/squadmaker">
              스쿼드메이커
            </NavLink>
          </li>
          <li>
            <NavLink to ="/gaebal">
              팀-개발
            </NavLink>
          </li>
          <li>
            <NavLink to ="/formation">
              포메이션
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
      <hr /> */}
    </div>
  );
};

export default Main;