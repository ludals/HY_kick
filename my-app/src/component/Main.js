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
      <nav>
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
            <NavLink style={styles} to="/squad">
              스쿼드
            </NavLink>
          </li>
          <li>
            <Link to ="/team1">팀1</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
      <hr />
    </div>
  );
};

export default Main;