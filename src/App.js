import logo from './logo.svg';
import './App.css';
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import MainRoutes from './routes/MainRoutes'
function App() {
  return (
    <div className="App">
      <Router>
          <MainRoutes />
      </Router>
    </div>
  );
}

export default App;
