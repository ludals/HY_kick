import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/ranking">순위</Link>
          </li>
          <li>
            <Link to="/schedule">스케줄</Link>
          </li>
          <li>
            <Link to="/squad">스쿼드</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </div>
  );
};

export default Main;