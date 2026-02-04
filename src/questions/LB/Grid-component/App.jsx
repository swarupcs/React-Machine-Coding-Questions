import Grid from "./components/Grid/Grid";
import GridItem from "./components/Grid/GridItem";
import "./components/Grid/grid.css";

export default function App() {
  return (
    <Grid spacing={1}>
      <GridItem size={4} sm={12}>Left</GridItem>
      <GridItem size={8} sm={12}>Right</GridItem>
    </Grid>
  );
}
