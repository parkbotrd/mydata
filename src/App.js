import './Style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './Components/Login'
import Mydata from './Components/Mydata'
import Main from './Components/Main'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login/">
          <Login />
        </Route>
        <Route path="/mydata/">
          <Mydata />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
