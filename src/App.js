import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

console.log("navbar");

function App() {
  return (
    <Router>
      <Navbar />
      

    </Router>
  );
}

export default App;
