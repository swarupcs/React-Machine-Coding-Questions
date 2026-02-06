import { DIAMETER } from '../../utils/helpers';

const Circle = ({ x, y, color }) => {
  const radius = DIAMETER / 2;

  return (
    <span
      style={{
        position: 'absolute',
        top: y - radius,
        left: x - radius,
        width: DIAMETER,
        height: DIAMETER,
        borderRadius: '50%',
        backgroundColor: color,
        transition: 'all 0.2s ease',
      }}
    />
  );
};

export default Circle;
