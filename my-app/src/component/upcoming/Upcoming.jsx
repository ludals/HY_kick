import styled from "styled-components";
import logo from '../team_image/gaebal.jpg'
import { Link } from "react-router-dom";
import { useState } from "react";
import UpcomingModal from "./UpcomingModal";

const Upcoming = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <UpcomingMatchWrapper onClick={openModal}>
                    <UpcomingInfo>
                        <div className="matchinfo">
                            11월 11일(금)<br/>오후 12시
                        </div>
                    </UpcomingInfo>
                    <UpcomingMatch>
                        <img
                            src={logo}
                            alt="logo"
                        />
                        <span className="Home">개발</span>
                        <span className="versus">vs</span>
                        <span className="Away">개발</span>
                        <img
                            src={logo}
                            alt="logo"
                        />
                    </UpcomingMatch>
                    <UpcomingInfo>
                        <div className="matchinfo">
                            한양대학교 대운동장<br/>개발
                        </div>
                    </UpcomingInfo>
                </UpcomingMatchWrapper>
                <UpcomingMatchWrapper onClick={openModal}>
                    <UpcomingInfo>
                        <div className="matchinfo">
                            11월 11일(금)<br/> 오후 1시
                        </div>
                    </UpcomingInfo>
                    <UpcomingMatch>
                        <img
                            src={logo}
                            alt="logo"
                        />
                        <span className="Home">개발</span>
                        <span className="versus">vs</span>
                        <span className="Away">개발</span>
                        <img
                            src={logo}
                            alt="logo"
                        />
                    </UpcomingMatch>
                    <UpcomingInfo>
                        <div className="matchinfo">
                            한양대학교 대운동장<br/>개발
                        </div>
                    </UpcomingInfo>
                </UpcomingMatchWrapper>
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
    img{
        width: 70px;
        height: 70px;
        border-radius: 70%;
        overflow: hidden;
    }
    .Home{
        margin: 1rem 2rem 0 1rem;
        font-size: 1.5rem;
    }
    .Away{
        margin: 1rem 1rem 0 2rem;
        font-size: 1.5rem;
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