import { useEffect, useRef, useState } from "react";
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
    const daysRef = useRef([]);
    const [prevDate, setPrevDate] = useState();
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const [matchInfo, setMatchInfo] = useState(matchData.filter((state) => new Date(state.date).getTime() === new Date(`${year}-${month}-${date}`).getTime()));
    const [weekData, setWeekData] = useState(new Date(year, month - 1, date));                                        //just move week
    const [monthArray, setMonthArray] = useState(Array.from({ length: days[month - 1] }, (_, index) => index + 1));       //date info of month
    const [monthDiv, setMonthDiv] = useState();
    const [weekDiv, setWeekDiv] = useState();

    const loadMatchData = (year, month, date) => {
        return matchData.filter((state) => new Date(state.date).getTime() === new Date(`${year}-${month}-${date}`).getTime());
    }

    useEffect(() => {
        setMonthDiv(monthArray && monthArray.map((value) => {
            return (
                <DayWrapper key={value} id={"daywrapper"} $isActive={loadMatchData(weekData.getFullYear(), weekData.getMonth() + 1, value).length}>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value} className="day">{day[(new Date(weekData.getFullYear(), weekData.getMonth(), value)).getDay()]}</div>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value + "date"} className="date">{value}</div>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value + "bar"} className="selectBar"></div>
                </DayWrapper>
            );
        }))
    }, [])

    useEffect(() => {
        const weeks = document.querySelectorAll("#daywrapper");
        for (let week of weeks) {
            week.addEventListener("click", () => selectDate(weekData.getFullYear(), weekData.getMonth() + 1, Number(week.children[1].outerText)));
        }
    }, [weekDiv, year, month, date])

    useEffect(() => {
        monthDiv && setWeekDiv(monthDiv.filter(value =>
            (weekData.getDate() - weekData.getDay()) <= value.key && (weekData.getDate() + (6 - weekData.getDay())) >= value.key
        ));
        selectDate(year, month, date);
    }, [monthDiv])

    function selectDate(Nyear, Nmonth, Nvalue) {
        const matchInfo = loadMatchData(Nyear, Nmonth, Nvalue);
        if (matchInfo.length === 0)
            return;

        for (let id of ["day", "date", "bar"]) {
            const curId = Nyear + "" + Nmonth + "" + Nvalue + id;
            const prevId = year + "" + month + "" + date + id;
            console.log(curId);
            if (document.getElementById(curId)) {
                console.log(document.getElementById(curId));
                if (id === "bar") {
                    document.getElementById(curId).style.background = "blue";
                    console.log(curId, "색바꿈");
                    if (document.getElementById(prevId) && curId !== prevId) {
                        document.getElementById(prevId).style.background = "white";
                    }
                }
                else {
                    document.getElementById(curId).style.color = "blue";
                    if (document.getElementById(prevId) && curId !== prevId) {
                        document.getElementById(prevId).style.color = "black";
                    }
                }

            }
        }
        setYear(Nyear);
        setMonth(Nmonth);
        setDate(Nvalue);
        setPrevDate(new Date(year, month - 1, date));
        setMatchInfo(matchInfo);
    }

    useEffect(() => {
        setMonthDiv(monthArray && monthArray.map((value) => {
            return (
                <DayWrapper key={value} id={"daywrapper"} $isActive={loadMatchData(weekData.getFullYear(), weekData.getMonth() + 1, value).length}>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value + "day"} className="day">{day[(new Date(weekData.getFullYear(), weekData.getMonth(), value)).getDay()]}</div>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value + "date"} className="date">{value}</div>
                    <div id={weekData.getFullYear() + "" + (weekData.getMonth() + 1) + "" + value + "bar"} className="selectBar"></div>
                </DayWrapper>
            );
        }))
        monthDiv && setWeekDiv(monthDiv.filter(value =>
            (weekData.getDate() - weekData.getDay()) <= value.key && (weekData.getDate() + (6 - weekData.getDay())) >= value.key
        ));
    }, [weekData])

    const prevMonth = () => {
        if (weekData.getMonth() === 0) {
            setMonthArray(Array.from({ length: days[11] }, (_, index) => index + 1));
            setWeekData((prev) => new Date(prev.getFullYear() - 1, 11, days[11]));
        }
        else {
            setMonthArray(Array.from({ length: days[weekData.getMonth() - 1] }, (_, index) => index + 1));
            setWeekData((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, days[prev.getMonth() - 1]))
        }
    };

    const nextMonth = () => {
        if (weekData.getMonth() === 11) {
            setMonthArray(Array.from({ length: days[0] }, (_, index) => index + 1));
            setWeekData((prev) => new Date(prev.getFullYear() + 1, 0, 1));
        }
        else {
            setMonthArray(Array.from({ length: days[weekData.getMonth() + 1] }, (_, index) => index + 1));
            setWeekData((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        }
    };

    const prevWeek = () => {
        setWeekData((prev) => (new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - (prev.getDay() + 1))))
    }

    const nextWeek = () => {
        setWeekData((prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + (-prev.getDay() + 7)));
    }

    return (
        <CalenderWrapper>
            <MonthSelectWrapper>
                <img src={arrowLeft} alt="left" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={prevMonth}></img>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{weekData.getFullYear()}.{weekData.getMonth() < 9 ? 0 : null}{weekData.getMonth() + 1}</div>
                <img src={arrowRight} alt="right" style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={nextMonth}></img>
            </MonthSelectWrapper>
            <WeekWrapper $date={weekData} $days={days}>
                <img src={gotoLeft} alt="gotoLeft" className="prevWeek" onClick={prevWeek} />
                <WeekView $date={weekData}>
                    {weekDiv}
                </WeekView>
                <img src={gotoRight} alt="gotoRight" className="nextWeek" onClick={nextWeek} />
            </WeekWrapper>
            <MatchWrapper>
                <div>{month}월 {date}일</div>
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