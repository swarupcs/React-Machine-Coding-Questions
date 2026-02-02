import ScrollIndicator from "../components/ScrollIndicator";

const ScrollDemo = () => {
  return (
    <>
      <ScrollIndicator />
      <div style={{ height: "200vh", paddingTop: "80px" }}>
        <p style={{ padding: "20px" }}>
          Scroll down to see the progress indicator in action.
        </p>
      </div>
    </>
  );
};

export default ScrollDemo;
