import styled from "styled-components";
import logo from '../team_image/gaebal.jpg'
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import UpcomingModal from "./UpcomingModal";

const Upcoming = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  // const homeComponent = document.getElementsByClassName('Home');
  // const awayComponent = document.getElementsByClassName('Away');
  const prevMatch = [props.matches[0], props.matches[1]];
  const upcomingMatch1 = [props.matches[2], props.matches[3]];
  const upcomingMatch2 = [props.matches[4], props.matches[5]];
  const ref = useRef(null);
  const matchWrapperSize = 27 * 16;
  const [swiped, setSwiped] = useState(false);
  const [positionx, setPositionx] = useState(0);
  const [imgCount, setImgCount] = useState(1);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = (e) => {
    setIsModalOpen(false);
  }

  const swipe = (div) => {
    if (div) {
      if (imgCount !== 3) {
        const move = (-matchWrapperSize * imgCount)
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount + 1);
      }
      else {
        div.style.transform = `translateX(calc(${matchWrapperSize * 0}px))`;
        setImgCount(1);
      }
    }
  }

  useEffect(() => {
    const div = ref.current;
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      swipe(div)
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [imgCount])

  const matchComponent = (matches) => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column", margin: "0 1rem" }}>
        {matches.map((match, index) => {
          return (
            <UpcomingMatchWrapper className="UpcomingMatchWrapper" onClick={openModal} key={index}>
              <UpcomingInfo className="UpcomingInfo">
                <div className="matchinfo">
                  <div>
                    {new Date(match.date).getMonth() + 1}월 {new Date(match.date).getDate()}일
                    ({days[new Date(match.date).getDay()]})
                  </div>
                  <div>
                    {match.time >= 12 ? "오후 " : "오전 "}
                    {match.time >= 13 ? match.time % 12 : match.time}시
                  </div>
                </div>
              </UpcomingInfo>
              <UpcomingMatch className="UpcomingMatch">
                <span className="Home">
                  <img
                    src={logo}
                    alt="logo"
                  />
                  {match.home}
                </span>
                <span className="versus">vs</span>
                <span className="Away">
                  <img
                    src={logo}
                    alt="logo"
                  />
                  {match.away}
                </span>
              </UpcomingMatch>
              <UpcomingInfo className="UpcomingInfo">
                <div className="matchinfo">
                  한양대학교 대운동장<br />심판
                </div>
              </UpcomingInfo>
            </UpcomingMatchWrapper>
          );
        })}
      </div>
    );
  }

  const prevMatchComponent = matchComponent(prevMatch);
  const upcomingComponent1 = matchComponent(upcomingMatch1);
  const upcomingComponent2 = matchComponent(upcomingMatch2);


  // useEffect(() => {
  //   Array.from(homeComponent).forEach((tmp) => {
  //     tmp.style.fontSize = `${26 - 1.5 * (tmp.textContent.length)}px`;
  //     tmp.style.fontWeight = "bold";
  //     tmp.style.marginLeft = tmp.textContent.length > 4 ? "1.5rem" : "1rem";
  //     tmp.style.marginRight = tmp.textContent.length > 4 ? "1.5rem" : "2rem";
  //   });
  //   Array.from(awayComponent).forEach((tmp) => {
  //     tmp.style.fontSize = `${26 - 1.5 * (tmp.textContent.length)}px`;
  //     tmp.style.fontWeight = "bold";
  //     tmp.style.marginLeft = tmp.textContent.length > 4 ? "1.5rem" : "2rem";
  //     tmp.style.marginRight = tmp.textContent.length > 4 ? "1.5rem" : "1rem";
  //   });
  // }, [homeComponent, awayComponent])

  const onTouchEnd = (e) => {
    const swipe = positionx - e.changedTouches[0].pageX;
    const div = ref.current;
    if (swipe > 30) {
      if (imgCount !== 3) {
        const move = (-matchWrapperSize * imgCount)
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount + 1);
      }
      else {
        div.style.transform = `translateX(calc(${matchWrapperSize * 0}px))`;
        setImgCount(1);
      }
      setSwiped(true);
    }
    else if (swipe < -30) {
      if (imgCount !== 1) {
        const move = (-matchWrapperSize * (imgCount - 2))
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount - 1);
      }
      else {
        div.style.transform = `translateX(calc(${-matchWrapperSize * 2}px))`;
        setImgCount(3);
      }
      setSwiped(true);
    }
  }


  return (
    <>
      {/* {isModalOpen ? <UpcomingModal closeModal={closeModal} /> : null} */}
      <UpcomingWrapper className="UpcomingWrapper">
        <UpcomingHeader className="UpcomingHeader">
          경기 일정/결과
        </UpcomingHeader>
        <UpcomingView className="UpcomingView" onTouchStart={(e) => setPositionx(e.changedTouches[0].pageX)} onTouchEnd={onTouchEnd}>
          <div ref={ref} className="upcoming_container">
            <UpcomingBody className="UpcomingBody">
              {prevMatchComponent}
            </UpcomingBody>
            <UpcomingBody className="UpcomingBody">
              {upcomingComponent1}
            </UpcomingBody>
            <UpcomingBody className="UpcomingBody">
              {upcomingComponent2}
            </UpcomingBody>
          </div>
        </UpcomingView>
        <Pagination>
          <PaginationDot $index={1} $imgcount={imgCount}></PaginationDot>
          <PaginationDot $index={2} $imgcount={imgCount}></PaginationDot>
          <PaginationDot $index={3} $imgcount={imgCount}></PaginationDot>
        </Pagination>
        <UpcomingFooter className="UpcomingFooter">
          <Link to="/schedule" className="link">
            <span>전체 일정 보기</span>
          </Link>
        </UpcomingFooter>
      </UpcomingWrapper>
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
    .upcoming_container{
      display: flex;
      gap: 3rem;
      transition: transform 0.5s ease;
    }
`;

const UpcomingHeader = styled.div`
    width: 30rem;
    display: flex;
    justify-content: center;
    font-size: 30px;
    color: navy;
    font-weight: 700;
`;

const UpcomingView = styled.div`
  width: 24rem;
  overflow: hidden;
`;

const UpcomingBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpcomingMatchWrapper = styled.div`
    width: 22rem;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    border: solid;
    border-width: 3px;
    border-color: #f5f2f5;
    box-sizing: border-box;
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
    gap: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    .Home{
      width: auto;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 70px;
        height: 70px;
        border-radius: 70%;
        overflow: hidden;
      }
    }
    .Away{
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
        width: 70px;
        height: 70px;
        border-radius: 70%;
        overflow: hidden;
    }
    }
    .versus{
        margin-top: 2rem;
        font-size: 0.8rem;
        font-weight: 500;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap : 0.5rem;
`;

const PaginationDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: 1px solid navy;
  background: ${(props) => (props.$imgcount !== props.$index ? "white" : "navy")};
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

PaginationDot.propTypes = {
  $imgcount: PropTypes.number,
  $index: PropTypes.number,
};