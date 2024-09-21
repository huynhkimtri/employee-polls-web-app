import { useParams } from "react-router-dom";

const PollDetail = () => {
  const { id } = useParams();
  return <div>PollDetail: {id}</div>;
};

export default PollDetail;
