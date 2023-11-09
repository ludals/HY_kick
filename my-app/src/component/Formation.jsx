import React, { useState } from 'react';
import styled from "styled-components";
import fieldImage from "../asset/field.jpg"


const Formation = ({ formation, players }) => {
    const formationData = getFormationData(formation);
  
    return (
      <FormationCard>
                <FormationName>
                  전 경기 포메이션: {formation}
                </FormationName>
                <Spacer />
      <FormationContainer>
        {formationData.map((position, index) => {
          const playerName = players[index];
          return (
            <PlayerPosition key={index} style={getPositionStyle(formation,index)}>
              {position}: {playerName}
            </PlayerPosition>
          );
        })}
      </FormationContainer>
      </FormationCard>
    );
  };
  export default Formation
  
  function getFormationData(formation) {
    switch (formation) {
      case '4-4-2':
        return ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'];
      case '4-3-3':
        return ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'RM', 'LW', 'ST', 'RW'];
      case '3-5-2':
        return ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'CM', 'RM', 'ST', 'ST'];
      default:
        // 기본 포메이션을 설정하거나 에러 처리
        return [];
    }
  }
  
  function getPositionStyle(formation,index) {
    const position = index + 1;
    let top;
    let left;
    if (formation === "4-4-2"){
      if (position === 1) {
        top = 90; // GK
        left = 44; // GK
      } else if (position >= 2 && position <= 5) {
        top = 65; // LB, CB, CB, RB
        left = 7+(position - 2) * 25;
      }  else if (position >= 6 && position <= 9) {
        top = 40; // LM, CM, CM, RM
        left = 7+(position - 6) * 25;
      } else if (position >= 10 && position <= 11) {
        top = 15; // ST, ST
        left = 31+(position - 10) * 25;
      }
    }
    else if (formation === "3-5-2"){
      if (position === 1) {
        top = 85; // GK
        left = 44; // GK
      } else if (position >= 2 && position <= 4){
        top = 65; //CB, CB, CB
        left = 24 + (position - 2)*20;
      } else if (position >= 5 && position <= 9){
        top = 40; //LM, CM, CM, CM, RM
        left = 8 + (position - 5)*18
      } else if (position >= 10 && position <= 11){
        top = 15; // ST,ST
        left = 31 + (position - 10)*25;
      }
    }
    
  
    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  }

  const FormationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  border: 1px solid #ddd;
  padding: 0px;
  text-align: center;
  margin: 10 auto; 
`;

const FormationName = styled.h3`
  margin: 10px 0;
`;

const Spacer = styled.span`
  margin: 20px;
`;

const FormationContainer = styled.div`
  position: relative;
  background-image: url(${fieldImage});
  width: 417px;
  height: 306px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

`;

const PlayerPosition = styled.div`
  position: absolute;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;