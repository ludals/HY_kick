import React, {useState, useEffect, useMemo} from "react";
import teams from "../teams.json"
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

const Register = () => {
    const positionlist = ["회장", "부원"];
    const teamlist = useMemo(() => {
        const mergedTeams = [...teams.sunbong, ...teams.gongde];
        return mergedTeams.map((team) => ({
          name: team.name,
          code: team.code,
        }));
      }, []);

    const [name, setName] = useState("");
    const [position, setPosition] = useState(positionlist[0]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [club, setClub] = useState(teamlist[0].name);
    const [clubcode, setClubcode] = useState("");
    const [backnum, setBacknum] = useState("");
    const [isvalid, setIsvalid] = useState({
        isphoneNumber: false,
        isclubcode: false,
        ispassword: false,
    });

    const formStyle = {
        height: "2rem",
        marginBottom: "1rem",
    };

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const onPositionHandler = (e) => {
        setPosition(e.currentTarget.value);
    };

    const onPhonNumberHandler = (e) => {
        let inputPhoneNumber = e.target.value;

        // 입력값에서 숫자만 추출
        inputPhoneNumber = inputPhoneNumber.replace(/\D/g, '');
    
        // 전화번호 형식에 따라 빈칸 추가 (예: 010 1234 5678)
        let formattedPhoneNumber = '';
        for (let i = 0; i < inputPhoneNumber.length; i++) {
          if (i === 3 || i === 7) {
            formattedPhoneNumber += ' '; // 4번째와 8번째 숫자 뒤에 빈칸 추가
          }
          formattedPhoneNumber += inputPhoneNumber[i];
        }
    
        // 전화번호 상태 업데이트
        setPhoneNumber(formattedPhoneNumber);
    }

    const onClubHandler = (e) => {
        setClub(e.currentTarget.value);
    };

    const onClubCodeHandler = (e) => {
        setClubcode(e.currentTarget.value);
    };

    const onBackNumHandler = (e) => {
        let bnum = e.currentTarget.value;
        if(bnum < 1 || bnum > 99){
            console.log("wrong")
        }

        setBacknum(e.currentTarget.value);
    };

    const onPasswordHanlder = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onconfirmPwHanlder = (e) => {
        setConfirmPw(e.currentTarget.value);
    };

    useEffect(() => {
        const phonePattern = /^010{1}[\s]?[0-9]{4}[\s]?[0-9]{4}$/;
    
        if(phonePattern.test(phoneNumber))
            setIsvalid((prev) => ({...prev, isphoneNumber: true}));
        else
            setIsvalid((prev) => ({...prev, isphoneNumber: false}));
    
    
        if (teamlist.find((team) => (
            team.name === club && team.code === clubcode
        ))) {
            setIsvalid((prev) => ({...prev, isclubcode: true}));
        } else {
            setIsvalid((prev) => ({...prev, isclubcode: false}));
        }

        if(password !== confirmPw){
            setIsvalid((prev) => ({...prev, ispassword: false}));
        }
        else{
            setIsvalid((prev) => ({...prev, ispassword: true}));
        }
    }, [phoneNumber, clubcode, club, teamlist, password, confirmPw, setIsvalid]);
    


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(isvalid.isclubcode !== true){
            return alert("동아리 코드를 확인해주세요");
        }
        else if(isvalid.isphoneNumber !== true){
            return alert("올바른 전화번호를 입력해주세요");
        }
        else if(isvalid.ispassword !== true){
            return alert("비밀번호를 확인해주세요");
        }
        
        let body = {
            name: name,
            phoneNumber: phoneNumber,
            position: position,
            club: club,
            backnum: backnum,
            password: password,
        };

        console.log(body);
    }

    
    
    return (
        <RegisterWrapper>
            <RegisterForm onSubmit={onSubmitHandler}>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" style={formStyle} value={name} onChange={onNameHandler} />
    
                <label htmlFor="position">직책</label>
                <select id="position" style={formStyle} onChange={onPositionHandler} value={position}>
                    {positionlist.map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
		        </select>
               
    
                <label htmlFor="number">전화 번호</label>
                <input type="text" value={phoneNumber} id="number" style={formStyle} onChange={onPhonNumberHandler} maxLength="13" />

                <label htmlFor="password">비밀번호</label>
                <input type="password" value={password} id="password" style={formStyle} onChange={onPasswordHanlder} />
                <label htmlFor="confrimpassword">비밀번호 확인</label>
                <input type="password" value={confirmPw} id="confrimpassword" style={formStyle} onChange={onconfirmPwHanlder} />
                

                <label htmlFor="club">동아리</label>
                <select id="club" style={formStyle} onChange={onClubHandler} value={club}>
                    {teamlist.map((item)=>(
                        <option value={item.name} key={item.name + item.code}>
                            {item.name}
                        </option>
                    ))}
		        </select>

                <label htmlFor="clubcode">동아리 코드</label>
                <input type="text" value={clubcode} id="clubcode" style={formStyle} onChange={onClubCodeHandler} />
                <label htmlFor="backnum">등 번호</label>
                <input type="text" value={backnum} id="backnum" style={formStyle} onChange={onBackNumHandler} />
                <button type="submit" style={{height:"2rem", background:"navy", color:"white"}}>회원가입</button>
            
            </RegisterForm>
        </RegisterWrapper>
    );
}

export default Register;

const RegisterWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
`;

const RegisterForm = styled.form`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
`;