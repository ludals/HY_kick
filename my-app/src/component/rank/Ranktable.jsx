import { Link } from "react-router-dom";
import {
  TableWrapper,
  TableHeader,
  TableBody
} from "./RankTableStyle";
import {
  TABLEHEADER,
  TEAMPAGE_PATH
} from "../../constants/constant";

const RankTable = ({ teamDatas }) => {
  return (
    <TableWrapper>
      <TableHeader>
        {
          TABLEHEADER.map((header) => {
            return (
              <div className={`${header.field}`} key={header.label}>
                {header.label}
              </div>
            );
          })
        }
      </TableHeader>
      {
        teamDatas?.map((data, index) => {
          return (
            <TableBody>
              {
                TABLEHEADER.map((header) => {
                  if (header.field === "rank")
                    return (
                      <div className={`${header.field}`} key={header.field + index}>
                        {index + 1}
                      </div>
                    )
                  else if (header.field === "link")
                    return (
                      <Link
                        to={TEAMPAGE_PATH[data.name] || '/default'}
                        className="link"
                        key={header.field + index}
                      >
                        <img
                          src='/image/right_arrow.png'
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span>팀페이지</span>
                      </Link>
                    )
                  else if (header.field === "name") {
                    return (
                      <div className={`${header.field}`} key={header.field + index}>
                        <img src="/image/gaebal.jpg" />
                        {data[header.field]}
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className={`${header.field}`} key={header.field + index}>
                        {data[header.field]}
                      </div>
                    )
                  }
                })
              }
            </TableBody>
          )
        })
      }
    </TableWrapper>
  );
};

export default RankTable; 