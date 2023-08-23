import React, { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Modal from 'react-modal';

import Match from "./Match"
import "./Match.css"
import matchData from "./matches.json"


const ModalStyle = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 10,
    
  },
  content: {
    width: "70%",
    height: "70%",
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    border: "none",
    background: "none",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 0,
    WebkitOverflowScrolling: "touch",
    borderRadius: "20px",
    zIndex: 20,
  },
};

const Schedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState();
  
  matchData.match.forEach(data => {
    data.title = data.home + " vs " + data.away;
    data.color = data.league === "선봉리그" ? 'blue' : 'navy';
  });

  const dateClicked = (arg) => {
    setModalIsOpen(true);
    setDate(arg.date);
  }
  
  return (
    <div className="App">
      <FullCalendar 
        initialView="dayGridMonth"
        dateClick={dateClicked}
        plugins={[dayGridPlugin, interactionPlugin]}
        height={"80vh"}
        events={matchData.match}
      />
      <Modal className="modal-schedule" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={ModalStyle} >
        <Match data={matchData.match} date={date}/>
      </Modal>
    </div>
  );
};
  
export default Schedule;
  