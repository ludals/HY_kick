import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useTeamData from "../../hooks/useTeamData";
import teams from "../teams.json"
import { HANYANG_COLOR, MARGIN_TOP } from "../../constants/styleconstant";

const Register = () => {

  // const { teams } = useTeamData();
  // console.log(teams)
  // const teams = useSelector((state) => state.teams.value);
  const teamlist = teams.sunbong.map((team) => {
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
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={onSubmitHandler}>
        <Label htmlFor="name">이름</Label>
        <Input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />

        <Label htmlFor="backnum">학번</Label>
        <Input type="text" value={studentNum} id="studentNum" onChange={(e) => setStudentNum(e.target.value)} />

        <Label htmlFor="position">직책</Label>
        <Select id="position" onChange={(e) => setPosition(e.target.value)} value={position}>
          {positionlist.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>

        <Label htmlFor="club">팀</Label>
        <Select id="club" onChange={(e) => setClub(e.target.value)} value={club}>
          {teamlist?.map((item, index) => (
            <Option value={item.team_name} key={index}>
              {item.team_name}
            </Option>
          ))}
        </Select>

        <Label htmlFor="clubcode">팀 코드</Label>
        <Input type="number" value={clubcode} id="clubcode" onChange={(e) => setClubcode(e.target.value)} />

        <Label htmlFor="backnum">등 번호</Label>
        <Input type="number" value={backnum} id="backnum" onChange={(e) => setBacknum(parseInt(e.target.value))} />
        <button type="submit" style={{ height: "2rem", background: "navy", color: "white" }}>회원가입</button>

      </RegisterForm>
    </RegisterWrapper>
  );
}

export default Register;

const RegisterWrapper = styled.div`
    width: 100%;
    height: calc(100vh - ${MARGIN_TOP});
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${HANYANG_COLOR.BLUE};
`;

const RegisterForm = styled.form`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
  color: white;
  font-size: 1rem;
`;

const Input = styled.input`
  height: 2rem;
  width: 100%;
  box-sizing: border-box;
  padding-left: 1px;
`;

const Select = styled.select`
  height: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const Option = styled.option`
  height: 1.3rem;
  width: 100%;
  font-size: 1.3rem;
`;