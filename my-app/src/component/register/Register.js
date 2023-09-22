import React, {useState, useEffect, useMemo} from "react";
import teams from "../teams.json"
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
    const [club, setClub] = useState(teamlist[0].name);
    const [clubcode, setClubcode] = useState("");
    const [backnum, setBacknum] = useState("");
    const [isvalid, setIsvalid] = useState({
        isphoneNumber: false,
        isclubcode: true,
    });

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
    }

    const onClubCodeHandler = (e) => {
        setClubcode(e.currentTarget.value);
    }

    const onBackNumHandler = (e) => {
        let bnum = e.currentTarget.value;
        if(bnum < 1 || bnum > 99){
            console.log("wrong")
        }

        setBacknum(e.currentTarget.value);
    }

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
    }, [phoneNumber, clubcode, club, teamlist, setIsvalid]);
    


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(isvalid.isclubcode !== true){
            return alert("동아리 코드를 확인해주세요");
        }
        else if(isvalid.isphoneNumber !== true){
            return alert("올바른 전화번호를 입력해주세요");
        }
        
        let body = {
            name: name,
            phoneNumber: phoneNumber,
            position: position,
            club: club,
            backnum: backnum,
        };

        console.log(body);
    }

    
    
    return (
        <div
        style={{ display: "flex", justifyContent: "center",  width: "100%", height: "100vh" }}
      >
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
                <label>이름</label>
                <input type="text" value={name} onChange={onNameHandler} />
    
                <label>직책</label>
                <select onChange={onPositionHandler} value={position}>
                    {positionlist.map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
		        </select>
               
    
                <label>전화 번호</label>
                <input type="text" value={phoneNumber} onChange={onPhonNumberHandler} maxLength="13" />
                

                <label>동아리</label>
                <select onChange={onClubHandler} value={club}>
                    {teamlist.map((item)=>(
                        <option value={item.name} key={item.name + item.code}>
                            {item.name}
                        </option>
                    ))}
		        </select>

                <label>동아리 코드</label>
                <input type="text" value={clubcode} onChange={onClubCodeHandler} />
                <label>등 번호</label>
                <input type="text" value={backnum} onChange={onBackNumHandler} />


                <br />
                <button type="submit">회원가입</button>
            
            </form>
        </div>
    );
}

export default Register;