import { useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

import scheduleReducer, { initialState } from "../../reducer/scheduleReducer"
import {
  CalenderWrapper,
  DayWrapper,
  MonthSelectWrapper,
  WeekWrapper,
  WeekView,
  MatchView,
  MatchWrapper
} from "./ScheduleStyle";

const Schedule = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(scheduleReducer, initialState);
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
  const storedDate = sessionStorage.getItem('curDate');


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
    if (storedDate && (new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date) !== new Date(storedDate))) {
      const date = storedDate.split('.').map(str => Number(str))
      dispatch({ type: 'SET_DATE', year: parseInt(date[0]), month: parseInt(date[1]), date: parseInt(date[2]) });
      setMatchInfo(loadMatchData(date[0], date[1], date[2]));
    }
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

  const clickMatch = (value) => {
    sessionStorage.setItem('curDate', `${state.clicked.year + '.' + state.clicked.month + '.' + state.clicked.date}`);
    navigate(`/result/${value.id}`, value)
  }

  return (
    <CalenderWrapper>
      <MonthSelectWrapper>
        <img src="/image/arrow_left.png" alt="left" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={prevMonth}></img>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{state.weekData.year}.{state.weekData.month < 10 ? 0 : null}{state.weekData.month}</div>
        <img src="/image/arrow_right.png" alt="right" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={nextMonth}></img>
      </MonthSelectWrapper>
      <WeekWrapper $date={new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date)} $days={state.days}>
        <img src="/image/gotoLeft.png" alt="gotoLeft" className="prevWeek" onClick={prevWeek} />
        <WeekView $date={new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date)}>
          {weekDiv}
        </WeekView>
        <img src="/image/gotoRight.png" alt="gotoRight" className="nextWeek" onClick={nextWeek} />
      </WeekWrapper>
      <MatchWrapper>
        <div className="dateInfo">{state.clicked.year}년 {state.clicked.month}월 {state.clicked.date}일</div>
        {
          matchInfo && matchInfo.map((value, index) => {
            return (
              <MatchView key={index} onClick={() => clickMatch(value)}>
                <div className="matchNum">
                  {/* <div>{index + 1}경기</div> */}
                  <div className="leaguetype">{value.league}</div>
                </div>
                <div className="matchInfo">
                  <div className="hometeam">{value.home}</div>
                  <img src={"/image/gaebal.jpg"} alt="logo"></img>
                  {
                    new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date + 1) > new Date() ?
                      <div className="versus">{value.time}:00</div>
                      : <div className="versus">1:0</div>
                  }
                  <img src={"/image/gaebal.jpg"} alt="logo"></img>
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