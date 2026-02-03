import { formatTime } from "../utils/formatTime";

const FormattedTime = ({ time }) => {
  return <span>{formatTime(time)}</span>;
};

export default FormattedTime;
