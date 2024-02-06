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
              <div className={header.field} key={header.field}>
                {header.label}
              </div>
            );
          })
        }
      </TableHeader>
      {
        teamDatas?.map((data, index) => {
          return (
            <TableBody key={index + data.name}>
              {
                TABLEHEADER.map((header) => {
                  if (header.field === "rank")
                    return (
                      <div className={header.field} key={index + header.field}>
                        {index + 1}
                      </div>
                    )
                  else if (header.field === "link")
                    return (
                      <Link
                        to={TEAMPAGE_PATH[data.name] || '/default'}
                        className={header.field}
                        key={index + header.field}
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
                      <div className={header.field} key={index + header.field}>
                        <img src="/image/gaebal.jpg" alt="" />
                        {data[header.field]}
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className={header.field} key={index + header.field}>
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