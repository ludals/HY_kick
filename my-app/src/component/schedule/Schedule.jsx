import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import gotoLeft from "../../asset/gotoLeft.png"
import gotoRight from "../../asset/gotoRight.png"
import arrowLeft from "../../asset/arrow_left.png"
import arrowRight from "../../asset/arrow_right.png"
import { useSelector } from "react-redux";
import logo from "../team_image/gaebal.jpg";

const initialState = {
  today: new Date(),
  clicked: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  weekData: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  prevDate: new Date(),
  day: ["일", "월", "화", "수", "목", "금", "토"],
  get days() {
    const isLeapYear = this.weekData.year % 4 === 0;
    return [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'GOTO_TODAY':
      return {
        ...state,
        weekData: {
          year: state.today.getFullYear(),
          month: state.today.getMonth() + 1,
          date: state.today.getDate(),
        },
        clicked: {
          year: state.today.getFullYear(),
          month: state.today.getMonth() + 1,
          date: state.today.getDate(),
        },
      };
    case 'PREV_MONTH':
      if (state.weekData.month === 1) {
        return {
          ...state,
          weekData: {
            year: state.weekData.year - 1,
            month: 12,
            date: state.days[11],
          },
          days: (state.weekData.year - 1) % 4 === 0
            ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        }
      }
      else {
        return {
          ...state,
          weekData: {
            year: state.weekData.year,
            month: state.weekData.month - 1,
            date: state.days[state.weekData.month - 2],
          }
        }
      }
    case 'NEXT_MONTH':
      if (state.weekData.month === 12) {
        return {
          ...state,
          weekData: {
            year: state.weekData.year + 1,
            month: 1,
            date: 1,
          },
          days: (state.weekData.year + 1) % 4 === 0
            ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        }
      }
      else {
        return {
          ...state,
          weekData: {
            year: state.weekData.year,
            month: state.weekData.month + 1,
            date: 1,
          }
        }
      }
    case 'PREV_WEEK':
      return {
        ...state,
        weekData: {
          ...state.weekData,
          date: new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date - (new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay() + 1)).getDate(),
        }
      };
    case 'NEXT_WEEK':
      return {
        ...state,
        weekData: {
          ...state.weekData,
          date: new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date + (-new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay() + 7)).getDate(),
        }
      };
    case 'DATE_CLICK':
      return {
        ...state,
        clicked: {
          year: action.year,
          month: action.month,
          date: action.date,
        },
        prevDate: new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date),
      };
    default:
      return null;
  }
}

const Schedule = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const matchData = useSelector((state) => state.match.value.match);
  const loadMatchData = (year, month, date) => {
    return matchData.filter((state) => new Date(state.date).getTime() === new Date(`${year}-${month}-${date}`).getTime());
  }
  const [matchInfo, setMatchInfo] = useState();
  const [monthDiv, setMonthDiv] = useState(Array.from({ length: state.days[state.weekData.month - 1] }, (_, index) => index + 1).map((value) => {
    return (
      <DayWrapper
        key={value}
        id={state.weekData.year + "." + state.weekData.month + "." + value + "daywrapper"}
        onClick={() => selectDate(value)}
        $isActive={loadMatchData(state.weekData.year, state.weekData.month, value).length}
        $clicked={new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date)}
        $date={new Date(state.weekData.year, state.weekData.month - 1, value)}
      >
        <div id={state.weekData.year + "." + state.weekData.month + "." + value + "day"} className="day">{state.day[(new Date(state.weekData.year, state.weekData.month - 1, value)).getDay()]}</div>
        <div id={state.weekData.year + "." + state.weekData.month + "." + value + "date"} className="date">{value}</div>
        <div id={state.weekData.year + "." + state.weekData.month + "." + value + "bar"} className="selectBar"></div>
      </DayWrapper>
    );
  }));
  const [weekDiv, setWeekDiv] = useState();



  useEffect(() => {
    setMonthDiv(Array.from({ length: state.days[state.weekData.month - 1] }, (_, index) => index + 1).map((value) => {
      return (
        <DayWrapper
          key={value}
          id={state.weekData.year + "." + (state.weekData.month) + "." + value + "daywrapper"}
          onClick={() => selectDate(value)}
          $isActive={loadMatchData(state.weekData.year, state.weekData.month, value).length}
          $clicked={new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date)}
          $date={new Date(state.weekData.year, state.weekData.month - 1, value)}
        >
          <div id={state.weekData.year + "." + state.weekData.month + "." + value + "day"} className="day">{state.day[(new Date(state.weekData.year, state.weekData.month - 1, value)).getDay()]}</div>
          <div id={state.weekData.year + "." + state.weekData.month + "." + value + "date"} className="date">{value}</div>
          <div id={state.weekData.year + "." + state.weekData.month + "." + value + "bar"} className="selectBar"></div>
        </DayWrapper>
      );
    }))
  }, [state.weekData.month, state.clicked])

  useEffect(() => {
    monthDiv && setWeekDiv(monthDiv.filter(value =>
      (state.weekData.date - new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay()) <= value.key && (state.weekData.date + (6 - new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay())) >= value.key
    ));
  }, [state.weekData, monthDiv])

  const selectDate = (value) => {
    const matchInfo = loadMatchData(state.weekData.year, state.weekData.month, value);
    if (matchInfo.length === 0)
      return;
    dispatch({ type: 'DATE_CLICK', year: state.weekData.year, month: state.weekData.month, date: value });
    setMatchInfo(matchInfo);
  }

  useEffect(() => {
    const matchInfo = loadMatchData(state.weekData.year, state.weekData.month, state.weekData.date);
    setMatchInfo(matchInfo);
  }, [])


  const prevMonth = () => {
    dispatch({ type: 'PREV_MONTH' });
  };

  const nextMonth = () => {
    dispatch({ type: 'NEXT_MONTH' })
  };

  const prevWeek = () => {
    dispatch({ type: 'PREV_WEEK' });
  }

  const nextWeek = () => {
    dispatch({ type: 'NEXT_WEEK' });
  }

  return (
    <CalenderWrapper>
      <MonthSelectWrapper>
        <img src={arrowLeft} alt="left" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={prevMonth}></img>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{state.weekData.year}.{state.weekData.month < 10 ? 0 : null}{state.weekData.month}</div>
        <img src={arrowRight} alt="right" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={nextMonth}></img>
      </MonthSelectWrapper>
      <WeekWrapper $date={new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date)} $days={state.days}>
        <img src={gotoLeft} alt="gotoLeft" className="prevWeek" onClick={prevWeek} />
        <WeekView $date={new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date)}>
          {weekDiv}
        </WeekView>
        <img src={gotoRight} alt="gotoRight" className="nextWeek" onClick={nextWeek} />
      </WeekWrapper>
      <MatchWrapper>
        <div className="dateInfo">{state.clicked.year}년 {state.clicked.month}월 {state.clicked.date}일</div>
        {
          matchInfo && matchInfo.map((value, index) => {
            return (
              <MatchView key={index}>
                <div className="matchNum">
                  {/* <div>{index + 1}경기</div> */}
                  <div className="leaguetype">{value.league}</div>
                </div>
                <div className="matchInfo">
                  <div className="hometeam">{value.home}</div>
                  <img src={logo} alt="logo"></img>
                  {
                    new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date + 1) > new Date() ?
                      <div className="versus">{value.time}:00</div>
                      : <div className="versus">1:0</div>
                  }
                  <img src={logo} alt="logo"></img>
                  <div className="awayteam">{value.away}</div>
                </div>
              </MatchView>
            );
          })
        }
      </MatchWrapper>
    </CalenderWrapper>
  );

}

export default Schedule;

const CalenderWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MonthSelectWrapper = styled.div`
    width: 70%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const WeekWrapper = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        @media (max-width: 600px){
            width: 1.5rem;
            height: 1.5rem;
        }
    }
    .prevWeek{
        visibility: ${(props) => (props.$date.getDate() - (props.$date.getDay() + 1) <= 0) ? "hidden" : "visible"};
    }
    .nextWeek{
        visibility: ${(props) => (props.$date.getDate() + (7 - props.$date.getDay()) > props.$days[props.$date.getMonth()]) ? "hidden" : "visible"};
    }
`;

const WeekView = styled.div`
    width: 35rem;
    height:3rem;
    display: flex;
    justify-content: ${(props) => (props.$date.getDate() - (props.$date.getDay() + 1) <= 0) ? "end" : "start"};
    @media (max-width: 600px){
        width: 21rem;
    }
`;

const DayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    
    @media (max-width: 600px){
        width: 3rem;
    }
    .day{
        width: 5rem;
        height: 1rem;
        font-size:0.8rem;
        color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : props.$isActive !== 0 ? "black" : "lightgray")};
        @media (max-width: 600px){
            width: 3rem;
        }
    }
    .date{
        width: 5rem;
        height: 2rem;
        font-size: 1.4rem;
        color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : props.$isActive !== 0 ? "black" : "lightgray")};
        @media (max-width: 600px){
            width: 3rem;
        }
    }
    .selectBar{
        width: 3rem;
        @media (max-width: 600px){
            width: 2rem;
        }
        height: 2px;
        background-color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : "white")};
    }
`;
const MatchWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .dateInfo{
      width: 30rem;
      height: 2rem;
      margin-top: 2rem;
      border: 1px solid black;
      border-radius: 10px;
      /* background: lightgrey; */
      display: flex;
      align-items: center;
      padding-left: 1rem;
      @media (max-width: 600px){
        width: 20rem;
      }
    }
`;

const MatchView = styled.div`
    width: 30rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px){
      width: 20rem;
    }
    .matchNum{
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1rem;
    }
    .leaguetype{
      width: 100%;
      height: 2rem;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }
    .matchInfo{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img{
          width: 30px;
          height: 30px;
          border-radius: 70%;
          overflow: hidden;
        }
        .hometeam{
          width: 5rem;
          display: flex;
          justify-content: end;
        }
        .awayteam{
          width: 5rem;
          display: flex;
          justify-content: start;
        }
        .versus{
          width: 4rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border : 1px solid black;
          border-radius: 10px;
          /* background: navy; */
        }
    }
`;

WeekView.propTypes = {
  $date: PropTypes.instanceOf(Date),
};

WeekWrapper.propTypes = {
  $date: PropTypes.instanceOf(Date),
  $days: PropTypes.array,
};

DayWrapper.propTypes = {
  $isActive: PropTypes.number,
  $clicked: PropTypes.instanceOf(Date),
  $date: PropTypes.instanceOf(Date),
};