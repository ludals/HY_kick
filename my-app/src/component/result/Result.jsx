import { useParams } from "react-router-dom";

const Result = () => {
  const matchID = useParams();
  return (
    <>
      <div>{matchID.id}</div>
    </>
  );
}

export default Result;