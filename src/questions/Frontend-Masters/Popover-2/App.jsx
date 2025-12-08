import './App.css';
import Popover from './Popover';

function PopOverApp() {
  return (
    <div>
      <Popover>
        <Popover.Action>Click Me</Popover.Action>
        <Popover.Content>This is the popover content!</Popover.Content>
      </Popover>
    </div>
  );
}

export default PopOverApp;
