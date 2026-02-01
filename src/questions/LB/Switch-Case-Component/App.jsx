import { CustomSwitch, CustomCase, DefaultCase } from './CustomSwitch';

const App = () => {
  return (
    <>
      <h2>React Custom Switch Case</h2>

      <CustomSwitch value='1000'>
        <CustomCase value={(e) => e < 10}>
          <div>Hello less than 10</div>
        </CustomCase>

        <CustomCase value='20'>Hello 20</CustomCase>
        <CustomCase value='30'>Hello 30</CustomCase>

        <CustomCase value='10'>
          <div>Hello 10</div>
        </CustomCase>

        <DefaultCase>Hello Default Case</DefaultCase>
      </CustomSwitch>
    </>
  );
};

export default App;
