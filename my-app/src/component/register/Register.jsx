import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useKakaoLogin from "../../hooks/useKakaoLogin";

const Register = () => {
  const kakaoURL = useKakaoLogin();
  const navigate = useNavigate();
  const teams = useSelector((state) => state.teams.value);
  const teamlist = teams.teams.teams.map((team) => {
    return team;
  });
  const positionlist = ["부원", "회장"];
  const [name, setName] = useState("");
  const [position, setPosition] = useState(positionlist[0]);
  const [club, setClub] = useState(teamlist[0].team_name);
  const [clubcode, setClubcode] = useState('');
  const [backnum, setBacknum] = useState('');
  const [studentNum, setStudentNum] = useState('');

  // useEffect(() => {
  //   const phonePattern = /^010{1}[\s]?[0-9]{4}[\s]?[0-9]{4}$/;

  //   if (phonePattern.test(phoneNumber))
  //     setIsvalid((prev) => ({ ...prev, isphoneNumber: true }));
  //   else
  //     setIsvalid((prev) => ({ ...prev, isphoneNumber: false }));


  //   if (teamlist.find((team) => (
  //     team.name === club && team.code === clubcode
  //   ))) {
  //     setIsvalid((prev) => ({ ...prev, isclubcode: true }));
  //   } else {
  //     setIsvalid((prev) => ({ ...prev, isclubcode: false }));
  //   }

  //   if (password !== confirmPw) {
  //     setIsvalid((prev) => ({ ...prev, ispassword: false }));
  //   }
  //   else {
  //     setIsvalid((prev) => ({ ...prev, ispassword: true }));
  //   }
  // }, [phoneNumber, clubcode, club, teamlist, password, confirmPw, setIsvalid]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const body = {
      name: name,
      student_number: studentNum,
      team_id: teamlist.filter(team => team.team_name === club)[0].team_id,
      position: position,
      jersey_number: backnum,
    };

    localStorage.setItem('register', JSON.stringify(body));
    window.location.href = kakaoURL;
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={onSubmitHandler}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />

        <label htmlFor="backnum">학번</label>
        <input type="text" value={studentNum} id="studentNum" onChange={(e) => setStudentNum(e.target.value)} />

        <label htmlFor="position">직책</label>
        <select id="position" onChange={(e) => setPosition(e.target.value)} value={position}>
          {positionlist.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <label htmlFor="club">팀</label>
        <select id="club" onChange={(e) => setClub(e.target.value)} value={club}>
          {teamlist?.map((item) => (
            <option value={item.team_name} key={item.team_name}>
              {item.team_name}
            </option>
          ))}
        </select>

        <label htmlFor="clubcode">팀 코드</label>
        <input type="number" value={clubcode} id="clubcode" onChange={(e) => setClubcode(e.target.value)} />

        <label htmlFor="backnum">등 번호</label>
        <input type="number" value={backnum} id="backnum" onChange={(e) => setBacknum(parseInt(e.target.value))} />
        <button type="submit" style={{ height: "2rem", background: "navy", color: "white" }}>회원가입</button>

      </RegisterForm>
    </RegisterWrapper>
  );
}

export default Register;

const RegisterWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterForm = styled.form`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
`;