import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import gotoLeft from "../../asset/gotoLeft.png"
import gotoRight from "../../asset/gotoRight.png"
import arrowLeft from "../../asset/arrow_left.png"
import arrowRight from "../../asset/arrow_right.png"
import { useSelector } from "react-redux";

const initialState = {
  today: new Date(),
  clicked: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  prevDate: new Date(),
  weekData: new Date(),
  day: ["일", "월", "화", "수", "목", "금", "토"],
  days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
}

function reducer(state, action) {
  switch (action.type) {
    case 'GOTO_TODAY':
      return {
        ...state,
        weekData: state.today,
        clicked: {
          year: state.today.getFullYear(),
          month: state.today.getMonth() + 1,
          date: state.today.getDate(),
        },
      };
    case 'PREV_MONTH':
      return {
        ...state,
        weekData: state.weekData.getMonth() === 0 ? new Date(state.weekData.getFullYear() - 1, 11, state.days[11]) : new Date(state.weekData.getFullYear(), state.weekData.getMonth() - 1, state.days[state.weekData.getMonth() - 1]),
      };
    case 'NEXT_MONTH':
      return {
        ...state,
        weekData: state.weekData.getMonth() === 11 ? new Date(state.weekData.getFullYear() + 1, 0, 1) : new Date(state.weekData.getFullYear(), state.weekData.getMonth() + 1, 1),
      };
    case 'PREV_WEEK':
      return {
        ...state,
        weekData: new Date(state.weekData.getFullYear(), state.weekData.getMonth(), state.weekData.getDate() - (state.weekData.getDay() + 1)),
      };
    case 'NEXT_WEEK':
      return {
        ...state,
        weekData: new Date(state.weekData.getFullYear(), state.weekData.getMonth(), state.weekData.getDate() + (-state.weekData.getDay() + 7)),
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
  const [monthDiv, setMonthDiv] = useState();
  const [weekDiv, setWeekDiv] = useState();


  useEffect(() => {
    setMonthDiv(Array.from({ length: state.days[state.weekData.getMonth()] }, (_, index) => index + 1).map((value) => {
      const clicked = document.getElementById(state.clicked.year + "." + state.clicked.month + "." + state.clicked.date + "daywrapper");
      if (clicked !== null) {
        const active = loadMatchData(state.weekData.getFullYear(), state.weekData.getMonth() + 1, value).length;
        clicked.children[0].style.color = active !== 0 ? "black" : "lightgray";
        clicked.children[1].style.color = active !== 0 ? "black" : "lightgray";
        clicked.children[2].style.background = "white";
      }
      return (
        <DayWrapper
          key={value}
          id={state.weekData.getFullYear() + "." + (state.weekData.getMonth() + 1) + "." + value + "daywrapper"}
          onClick={() => selectDate(value)}
          $isActive={loadMatchData(state.weekData.getFullYear(), state.weekData.getMonth() + 1, value).length}
        >
          <div id={state.weekData.getFullYear() + "." + (state.weekData.getMonth() + 1) + "." + value + "day"} className="day">{state.day[(new Date(state.weekData.getFullYear(), state.weekData.getMonth(), value)).getDay()]}</div>
          <div id={state.weekData.getFullYear() + "." + (state.weekData.getMonth() + 1) + "." + value + "date"} className="date">{value}</div>
          <div id={state.weekData.getFullYear() + "." + (state.weekData.getMonth() + 1) + "." + value + "bar"} className="selectBar"></div>
        </DayWrapper>
      );
    }))
  }, [state.weekData])

  useEffect(() => {
    monthDiv && setWeekDiv(monthDiv.filter(value =>
      (state.weekData.getDate() - state.weekData.getDay()) <= value.key && (state.weekData.getDate() + (6 - state.weekData.getDay())) >= value.key
    ));
  }, [monthDiv])

  useEffect(() => {
    const clicked = document.getElementById(state.clicked.year + "." + state.clicked.month + "." + state.clicked.date + "daywrapper");
    if (clicked !== null) {
      clicked.children[0].style.color = "blue";
      clicked.children[1].style.color = "blue";
      clicked.children[2].style.background = "blue";
    }
    const prev = document.getElementById(state.prevDate.getFullYear() + "." + (state.prevDate.getMonth() + 1) + "." + state.prevDate.getDate() + "daywrapper");
    if (prev !== null && clicked !== prev) {
      prev.children[0].style.color = "black";
      prev.children[1].style.color = "black";
      prev.children[2].style.background = "white";
    }
  }, [state.clicked, state.prevDate, weekDiv])

  const selectDate = (value) => {
    const matchInfo = loadMatchData(state.weekData.getFullYear(), state.weekData.getMonth() + 1, value);
    if (matchInfo.length === 0)
      return;
    dispatch({ type: 'DATE_CLICK', year: state.weekData.getFullYear(), month: state.weekData.getMonth() + 1, date: value });
    setMatchInfo(matchInfo);
  }


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
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{state.weekData && state.weekData.getFullYear()}.{state.weekData && state.weekData.getMonth() < 9 ? 0 : null}{state.weekData && state.weekData.getMonth() + 1}</div>
        <img src={arrowRight} alt="right" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={nextMonth}></img>
      </MonthSelectWrapper>
      <WeekWrapper $date={state.weekData} $days={state.days}>
        <img src={gotoLeft} alt="gotoLeft" className="prevWeek" onClick={prevWeek} />
        <WeekView $date={state.weekData}>
          {weekDiv}
        </WeekView>
        <img src={gotoRight} alt="gotoRight" className="nextWeek" onClick={nextWeek} />
      </WeekWrapper>
      <MatchWrapper>
        <div>{state.clicked.month}월 {state.clicked.date}일</div>
        {
          matchInfo && matchInfo.map((value, index) => {
            return (
              <MatchView key={index}>
                <div className="matchNum">
                  <div>{index + 1}경기</div>
                  <div>{value.league}</div>
                </div>
                <div className="matchInfo">
                  <div>{value.home}</div>
                  <div>vs</div>
                  <div>{value.away}</div>
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
        color: ${(props) => (props.$isActive !== 0 ? "black" : "lightgray")};
        @media (max-width: 600px){
            width: 3rem;
        }
    }
    .date{
        width: 5rem;
        height: 2rem;
        font-size: 1.4rem;
        color: ${(props) => (props.$isActive !== 0 ? "black" : "lightgray")};
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
        background-color: #FFFFFF;
    }
`;
const MatchWrapper = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
`;

const MatchView = styled.div`
    width: 50%;
    height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .matchNum{
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1rem;
    }
    .matchInfo{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
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
};