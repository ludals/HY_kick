import styled from "styled-components";
import logo from '../team_image/gaebal.jpg'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UpcomingModal from "./UpcomingModal";

const Upcoming = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const homeComponent = document.getElementsByClassName('Home');
    const awayComponent = document.getElementsByClassName('Away');

    useEffect(()=>{
        Array.from(homeComponent).forEach((tmp) => {
            tmp.style.fontSize = `${26 - 1.5 * (tmp.textContent.length)}px`;
            tmp.style.fontWeight = "bold";
            tmp.style.marginLeft = tmp.textContent.length > 4 ? "1.5rem" : "1rem";
            tmp.style.marginRight = tmp.textContent.length > 4 ? "1.5rem" : "2rem";
        });
        Array.from(awayComponent).forEach((tmp) => {
            tmp.style.fontSize = `${26 - 1.5 *(tmp.textContent.length)}px`;
            tmp.style.fontWeight = "bold";
            tmp.style.marginLeft = tmp.textContent.length > 4 ? "1.5rem" : "2rem";
            tmp.style.marginRight = tmp.textContent.length > 4 ? "1.5rem" : "1rem";
        });
    }, [homeComponent, awayComponent])

    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = (e) => {
        setIsModalOpen(false);
    }

    const upcoming =
            <UpcomingWrapper>
                <UpcomingHeader>
                    이번 주 경기
                </UpcomingHeader>
                {
                    props.matches && props.matches.map((match, index) => {
                        return(
                            <UpcomingMatchWrapper onClick={openModal} key={index}>
                                <UpcomingInfo>
                                    <div className="matchinfo">
                                        <div>
                                            {new Date(match.date).getMonth()+1}월 {new Date(match.date).getDate()}일 
                                            ({days[new Date(match.date).getDay()]})
                                        </div>
                                        <div>
                                            {match.time >= 12 ? "오후 " : "오전 "}
                                            {match.time >= 13 ? match.time % 12 : match.time}시
                                        </div>
                                    </div>
                                </UpcomingInfo>
                                <UpcomingMatch>
                                    <img
                                        src={logo}
                                        alt="logo"
                                    />
                                    <span className="Home">{match.home}</span>
                                    <span className="versus">vs</span>
                                    <span className="Away">{match.away}</span>
                                    <img
                                        src={logo}
                                        alt="logo"
                                    />
                                </UpcomingMatch>
                                <UpcomingInfo>
                                    <div className="matchinfo">
                                        한양대학교 대운동장<br/>심판
                                    </div>
                                </UpcomingInfo>
                            </UpcomingMatchWrapper>
                        );
                    })
                }
                <UpcomingFooter>
                    <Link to="/schedule" className="link">
                        <span>전체 일정 보기</span>
                    </Link>
                </UpcomingFooter>
            </UpcomingWrapper>

    return(
        <>
            {isModalOpen ? <UpcomingModal closeModal={closeModal}/> : null}
            {upcoming}
        </>
       
    );
}

export default Upcoming;

const UpcomingWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const UpcomingHeader = styled.div`
    width: 30rem;
    display: flex;
    justify-content: center;
    font-size: 30px;
    color: navy;
    font-weight: 700;
`;

const UpcomingMatchWrapper = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    border: solid;
    border-width: 3px;
    border-color: #f5f2f5;
    /* border-radius: 80px; */
`;

const UpcomingMatch = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    img{
        width: 70px;
        height: 70px;
        border-radius: 70%;
        overflow: hidden;
    }
    .Home{
        width: 3rem;
        height: 2rem;
        margin: 1rem 2rem 0 1rem;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Away{
        width: 3rem;
        height: 2rem;
        margin: 1rem 1rem 0 2rem;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .versus{
        margin-top: 2rem;
    }
`;

const UpcomingInfo = styled.div`
    width: auto;
    height: 3rem;
    display:flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    padding-top: 1rem;
    white-space: pre-line;
`;

const UpcomingFooter = styled.div`
    width: auto;
    height: 1rem;
    display: flex;
    .link{
        width:auto;
        height: 1rem;
        font-size:1rem;
        justify-content: center;
        text-align: center;
        font-weight:1000;
        color: lightgray;
    }
`;