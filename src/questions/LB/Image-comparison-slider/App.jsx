import ImageComparisonSlider from "./components/ImageComparisonSlider/ImageComparisonSlider";

const App = () => {
  return (
    <div style={{ padding: "40px" }}>
      <ImageComparisonSlider
        image1="https://cdn.pixabay.com/photo/2019/12/30/13/10/lost-places-4729640_1280.jpg"
        image2="https://cdn.pixabay.com/photo/2018/09/16/15/31/boy-3681679_1280.jpg"
        width="600px"
        height="400px"
      />
    </div>
  );
};

export default App;
