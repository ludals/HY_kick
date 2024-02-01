import React, { useState, useRef } from 'react';
import styled from "styled-components";

const Formation = ({ formation, players }) => {
  const modalRef = useRef(null);
  const formationData = getFormationData(formation);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const handlePlayerClick = (playerName) => {
    setSelectedPlayer(playerName);
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setSelectedPlayer('');
    }
    setShowModal(false);
    setSelectedPlayer('');
  };

  return (
    <FormationCard>
      <FormationName>
        전 경기 포메이션: {formation}
      </FormationName>
      <Spacer />
      <FormationContainer>
        {formationData.map((position, index) => {
          const playerName = players[index];
          const style = getPositionStyle(formation, index);
          return (
            <PlayerButton key={index} style={{ top: `${style.top}`, left: `${style.left}` }} onClick={() => handlePlayerClick(playerName)}>
              {position}
              <br />
              {playerName}
            </PlayerButton>
          );
        })}
      </FormationContainer>
      {showModal && (
        <ModalWrapper ref={modalRef} onClick={handleCloseModal}>
          <ModalContent>
            <ModalHeader>
              <h2>선택된 선수 정보</h2>
            </ModalHeader>
            <p>{selectedPlayer}</p>
            <ModalCloseButton onClick={handleCloseModal}>닫기</ModalCloseButton>
          </ModalContent>
        </ModalWrapper>
      )}
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
    case '3-4-3':
      return ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'LW', 'ST', 'RW'];
    case '5-3-2':
      return ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'ST', 'ST'];
    case '5-4-1':
      return ['GK', 'LB', 'CB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST'];
    case '3-6-1':
      return ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'CM', 'CM', 'RM', 'ST'];
    case '4-2-3-1':
      return ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'CAM', 'CAM', 'CAM', 'ST'];
    case '4-1-4-1':
      return ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'LM', 'CM', 'CM', 'RM', 'ST'];
    case '4-3-1-2':
      return ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'CDM', 'CAM', 'ST', 'ST'];
    case '3-3-4':
      return ['GK', 'CB', 'CB', 'CB', 'CM', 'CM', 'CM', 'LW', 'ST', 'ST', 'RW'];
    case '3-4-1-2':
      return ['GK', 'CB', 'CB', 'CB', 'LM', 'CDM', 'CDM', 'RM', 'CAM', 'ST', 'ST'];
    case '3-4-2-1':
      return ['GK', 'CB', 'CB', 'CB', 'LM', 'CDM', 'CDM', 'RM', 'CAM', 'CAM', 'ST'];
    case '3-1-4-2':
      return ['GK', 'CB', 'CB', 'CB', 'CDM', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'];
    default:
      return [];
  }
}
export { getFormationData, getPositionStyle }

function getPositionStyle(formation, index) {
  const position = index + 1;
  let top;
  let left;
  if (formation === "4-4-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 5) {
      top = 65; // LB, CB, CB, RB
      left = 5 + (position - 2) * 25;
    } else if (position >= 6 && position <= 9) {
      top = 40; // LM, CM, CM, RM
      left = 5 + (position - 6) * 25;
    } else if (position >= 10 && position <= 11) {
      top = 15; // ST, ST
      left = 30 + (position - 10) * 25;
    }
  }
  else if (formation === "4-3-3") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 5) {
      top = 65; // LB, CB, CB, RB
      left = 5 + (position - 2) * 25;
    } else if (position >= 6 && position <= 8) {
      top = 40; //LM, CM, RM
      left = 20 + (position - 6) * 22;
    } else if (position >= 9 && position <= 11) {
      top = 15; // LW, ST, RW
      left = 20 + (position - 9) * 22;
    }
  }
  else if (formation === "3-5-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 65; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 5 && position <= 9) {
      top = 40; //LM, CM, CM, CM, RM
      left = 2 + (position - 5) * 20;
    } else if (position >= 10 && position <= 11) {
      top = 15; // ST,ST
      left = 30 + (position - 10) * 25;
    }
  }
  else if (formation === "3-4-3") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 65; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 5 && position <= 8) {
      top = 40; //LM, CM, CM, RM
      left = 5 + (position - 5) * 25;
    } else if (position >= 9 && position <= 11) {
      top = 15; // LW, ST, RW
      left = 20 + (position - 9) * 22;
    }
  }
  else if (formation === "5-3-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 6) {
      top = 65; //LB, CB, CB, CB, RB
      left = 2 + (position - 2) * 20;
    } else if (position >= 7 && position <= 9) {
      top = 40; //CM, CM, CM
      left = 20 + (position - 7) * 22;
    } else if (position >= 10 && position <= 11) {
      top = 15; // ST,ST
      left = 30 + (position - 10) * 25;
    }
  }
  else if (formation === "5-4-1") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 6) {
      top = 65; //LB, CB, CB, CB, RB
      left = 2 + (position - 2) * 20;
    } else if (position >= 7 && position <= 10) {
      top = 40; //LM, CM, CM, RM
      left = 5 + (position - 7) * 25;
    } else if (position === 11) {
      top = 15; // ST
      left = 42;
    }
  }
  else if (formation === "3-3-4") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 65; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 5 && position <= 7) {
      top = 40; //CM, CM, CM
      left = 20 + (position - 5) * 22;
    } else if (position >= 8 && position <= 11) {
      top = 15; // LW, ST, ST, RW
      left = 5 + (position - 8) * 25;
    }
  }
  else if (formation === "3-6-1") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 65; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 6 && position <= 9) {
      top = 40; //CM, CM, CM, CM
      left = 12.5 + (position - 6) * 20;
    } else if (position === 5 || position === 10) {
      top = 30; //LM, RM
      left = 2 + (position - 5) * 16;
    } else if (position === 11) {
      top = 15; // ST
      left = 42;
    }
  }
  else if (formation === "4-2-3-1") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 5) {
      top = 67; //LB, CB, CB, RB
      left = 5 + (position - 2) * 25;
    } else if (position >= 6 && position <= 7) {
      top = 49; //CDM, CDM
      left = 30 + (position - 6) * 25;
    } else if (position >= 8 && position <= 10) {
      top = 31; //CAM, CAM, CAM
      left = 20 + (position - 8) * 22;
    } else if (position === 11) {
      top = 13; // ST
      left = 42;
    }
  }
  else if (formation === "4-1-4-1") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 5) {
      top = 67; //LB, CB, CB, RB
      left = 5 + (position - 2) * 25;
    } else if (position === 6) {
      top = 49; //CDM
      left = 42;
    } else if (position >= 7 && position <= 10) {
      top = 31; //LM, CM, CM, RM
      left = 5 + (position - 7) * 25;
    } else if (position === 11) {
      top = 13; // ST
      left = 42;
    }
  } else if (formation === "4-3-1-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 5) {
      top = 67; //LB, CB, CB, RB
      left = 5 + (position - 2) * 25;
    } else if (position >= 6 && position <= 8) {
      top = 49; //CDM, CDM, CDM
      left = 20 + (position - 6) * 22;
    } else if (position === 9) {
      top = 31; //CAM
      left = 42;
    } else if (position >= 10 && position <= 11) {
      top = 13; // ST, ST
      left = 30 + (position - 10) * 25;
    }
  }
  else if (formation === "3-4-1-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 67; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 5 && position <= 8) {
      top = 49; //LM, CDM, CDM, RM
      left = 5 + (position - 5) * 25;
    } else if (position === 9) {
      top = 31; //CAM
      left = 42;
    } else if (position >= 10 && position <= 11) {
      top = 13; // ST, ST
      left = 30 + (position - 10) * 25;
    }
  } else if (formation === "3-4-2-1") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 67; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position >= 5 && position <= 8) {
      top = 49; //LM, CDM, CDM, RM
      left = 5 + (position - 5) * 25;
    } else if (position >= 9 && position <= 10) {
      top = 31; //CAM, CAM
      left = 30 + (position - 9) * 25;
    } else if (position === 11) {
      top = 13; // ST
      left = 42;
    }
  }
  else if (formation === "3-1-4-2") {
    if (position === 1) {
      top = 85; // GK
      left = 42; // GK
    } else if (position >= 2 && position <= 4) {
      top = 67; //CB, CB, CB
      left = 20 + (position - 2) * 22;
    } else if (position === 5) {
      top = 49; //CDM
      left = 42;
    } else if (position >= 6 && position <= 9) {
      top = 31; //LM, CM, CM, RM
      left = 5 + (position - 6) * 25;
    } else if (position >= 10 && position <= 11) {
      top = 13; // ST
      left = 30 + (position - 10) * 25;
    }
  }
  return {
    top: `${top - 5}%`,
    left: `${left}%`,
  };
}

const FormationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  border: 1px solid #ddd;
  padding: 5px;
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
  background-image: url(${'/image/field.jpg'});
  width: 360px;
  height: 306px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

// const PlayerPosition = styled.div`
//   position: absolute;
//   font-size: 12px;
//   text-align: center;
//   font-weight: bold;
// `;
const PlayerButton = styled.button`
  position: absolute;
  padding: 4px;
  margin: 4px;
  background-color: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 50px;
  height: 38px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalCloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
`;