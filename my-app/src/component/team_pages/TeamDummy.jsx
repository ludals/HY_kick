const dummyScorers = [
  { id: 1, playerName: "Player 1", goals: 10 },
  { id: 2, playerName: "Player 2", goals: 8 },
  { id: 3, playerName: "Player 3", goals: 7 },
  { id: 4, playerName: "Player 4", goals: 5 },
  { id: 5, playerName: "Player 5", goals: 4 },
  { id: 6, playerName: "Player 6", goals: 3 },
  { id: 7, playerName: "Player 7", goals: 2 },
  { id: 8, playerName: "Player 8", goals: 1 },
  { id: 9, playerName: "Player 9", goals: 1 },
  { id: 10, playerName: "Player 10", goals: 0 },
];

const dummyTeamPlayers = [
  { id: 1, playerName: "Player 1", position: "Forward", isPresident: false },
  { id: 2, playerName: "Player 2", position: "Midfielder", isPresident: true },
  { id: 3, playerName: "Player 3", position: "Defender", isPresident: false },
  { id: 4, playerName: "Player 4", position: "Goalkeeper", isPresident: false },
  { id: 5, playerName: "Player 5", position: "Forward", isPresident: false },
  { id: 6, playerName: "Player 6", position: "Midfielder", isPresident: false },
  { id: 7, playerName: "Player 7", position: "Defender", isPresident: false },
  { id: 8, playerName: "Player 8", position: "Defender", isPresident: false },
  { id: 9, playerName: "Player 9", position: "Midfielder", isPresident: false },
  { id: 10, playerName: "Player 10", position: "Forward", isPresident: false },
];

const dummyMatches = [
  {
    id: 1,
    date: new Date("2024-02-23T18:30:00"),
    time: 18,
    teams: [
      { name: "Team A", score: 3 },
      { name: "Team B", score: 2 }
    ],
    referee: { name: "Referee Name", image: "/image/gaebal.jpg" }
  },
  {
    id: 2,
    date: new Date("2024-02-24T15:00:00"),
    time: 15,
    teams: [
      { name: "Team C", score: 1 },
      { name: "Team D", score: 1 }
    ],
    referee: { name: "Referee Name", image: "/image/gaebal.jpg" }
  },
];


export { dummyScorers, dummyTeamPlayers, dummyMatches }