import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Navibar from './Components/Navibar/Navibar'
import IndicatorsContainer from './Components/Indicators/IndicatorsContainer'


function App() {
  return (
    <div>
      <Router>
      <Navibar />
      <Route exact path='/' />
      <Route path='/indicators' render={()=> <IndicatorsContainer />} />
      </Router>
    </div>
  );
}

export default App;
