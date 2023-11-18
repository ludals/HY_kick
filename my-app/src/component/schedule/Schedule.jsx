import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import gotoLeft from "../../asset/gotoLeft.png"
import gotoRight from "../../asset/gotoRight.png"
import arrowLeft from "../../asset/arrow_left.png"
import arrowRight from "../../asset/arrow_right.png"
import { useSelector } from "react-redux";

const Schedule = () => {
    const matchData = useSelector((state) => state.match.value.match);
    const now = new Date();                                 //current date
    const [year, setYear] = useState(now.getFullYear());    //selected year
    const [month, setMonth] = useState(now.getMonth() + 1); //selected month
    const [date, setDate] = useState(now.getDate());        //selected day
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const days = [31, 28, 31, 30 ,31, 30, 31, 31, 30, 31, 30, 31];
    const [monthData, setMonthData] = useState({
        date: new Date(year, month-1, date),        //just move week
        days: Array.from({ length: days[month-1] }, (_, index) => index + 1),       //date info of selected month
    });
    const [monthDiv, setMonthDiv] = useState(monthData.days && monthData.days.map((value, index) => {
        return(
            <DayWrapper key={index+1}>
                <div className="day">{day[(new Date(year, month-1, value)).getDay()]}</div>
                <div className="date">{value}</div>
            </DayWrapper>
        );
    }));


    const [weekDiv, setWeekDiv] = useState(monthDiv.filter(value => 
        (date - now.getDay()) <= value.key && (date + (6 - now.getDay())) >= value.key
    ));

    const loadMatchData = (year, month, date) => {
        return (matchData.filter((state) => new Date(state.date).getTime() === new Date(`${year}-${month}-${date}`).getTime()).length ? true : false);
    }

    useEffect(() => {
        setMonthDiv(monthData.days && monthData.days.map((value, index) => {
            return(
                <DayWrapper key={index+1} $isActive={loadMatchData(monthData.date.getFullYear(), monthData.date.getMonth()+1, index+1)}>
                    <div className="day">{day[(new Date(monthData.date.getFullYear(), monthData.date.getMonth(), value)).getDay()]}</div>
                    <div className="date">{value}</div>
                </DayWrapper>
            );
        }))
    }, [monthData.days])

    useEffect(() => {     
        setWeekDiv(monthDiv.filter(value => 
            (monthData.date.getDate() - monthData.date.getDay()) <= value.key && (monthData.date.getDate() + (6 - monthData.date.getDay())) >= value.key
        ));
    }, [monthData.date, monthDiv])


 
    
    const prevMonth = () => {
        if(monthData.date.getMonth() === 0){
            setMonthData((prev) => ({
                days: Array.from({ length: days[11] }, (_, index) => index + 1),
                date: new Date(prev.date.getFullYear()-1, 11, days[11]),
            }));
        }
        else{
            setMonthData((prev) => ({
                days: Array.from({ length: days[prev.date.getMonth()-1] }, (_, index) => index + 1),
                date: new Date(prev.date.getFullYear(), prev.date.getMonth()-1, days[prev.date.getMonth()-1]),
            }));
        }
    };

    const nextMonth = () => {
        if(monthData.date.getMonth() === 11){
            setMonthData((prev) => ({
                days: Array.from({ length: days[0] }, (_, index) => index + 1),
                date: new Date(prev.date.getFullYear()+1, 0, 1),
            }));
        }
        else{
            setMonthData((prev) => ({
                days: Array.from({ length: days[prev.date.getMonth()+1] }, (_, index) => index + 1),
                date: new Date(prev.date.getFullYear(), prev.date.getMonth()+1, 1),
            }));
        }
    };

    const prevWeek = () => {
        setMonthData((prev) => ({
            ...prev,
            date: new Date(prev.date.getFullYear(), prev.date.getMonth(), prev.date.getDate() - (prev.date.getDay() + 1)),
        }));
    }

    const nextWeek = () => {
        setMonthData((prev) => ({
            ...prev,
            date: new Date(prev.date.getFullYear(), prev.date.getMonth(), prev.date.getDate() + (-prev.date.getDay() + 7)),
        }));
    }

    return(
        <CalenderWrapper>
            <MonthSelectWrapper>
                <img src={arrowLeft} alt="left" style={{width:"25px", height:"25px", cursor: "pointer"}} onClick={prevMonth}></img>
                <div style={{fontSize:"1.5rem", fontWeight:"bold"}}>{monthData.date.getFullYear()}.{monthData.date.getMonth() < 9 ? 0 : null}{monthData.date.getMonth()+1}</div>
                <img src={arrowRight} alt="right" style={{width:"25px", height:"25px", cursor: "pointer"}} onClick={nextMonth}></img>
            </MonthSelectWrapper>
            <WeekWrapper $date={monthData.date} $days={days}>
                <img src={gotoLeft} alt="gotoLeft" className="prevWeek" onClick={prevWeek}/>
                <WeekView $date={monthData.date}>
                    {weekDiv}
                </WeekView>
                <img src={gotoRight} alt="gotoRight" className="nextWeek" onClick={nextWeek}/>
            </WeekWrapper>
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
        color: ${(props) => (props.$isActive === null ? "blue" : (props.$isActive ? "black" : "lightgray"))};
        @media (max-width: 600px){
            width: 3rem;
        }
    }
    .date{
        width: 5rem;
        height: 2rem;
        font-size: 1.4rem;
        color: ${(props) => (props.$isActive === null ? "blue" : (props.$isActive ? "black" : "lightgray"))};
        @media (max-width: 600px){
            width: 3rem;
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
    $isActive: PropTypes.bool,
};