import "./App.css";
import UserPage from "./Components/UserPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      {
        // <UserPage highlightColor="#f44336" />;
      }

      <Route path="/intern/jr-revenue/page/" component={UserPage} />
    </Router>
  );
};

export default App;
