import ToggleSwitch from "../components/ToggleSwitch";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const ToggleDemo = () => {
  return (
    <>
      <ToggleSwitch rounded checked />

      <ToggleSwitch variant="success" />

      <ToggleSwitch
        variant="danger"
        rounded
        defaultChecked
        checkedChildren={<CheckOutlined />}
        uncheckedChildren={<CloseOutlined />}
      />

      <ToggleSwitch
        defaultChecked
        checkedChildren="ON"
        uncheckedChildren="OFF"
      />
    </>
  );
};

export default ToggleDemo;
