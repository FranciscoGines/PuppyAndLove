import { Switch, Route } from "react-router-dom";//esto es para poder enrutar componentes en nuestra App
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";
// import PomeraniaToy from './assets/img/PomeraniaToy.jpg';

const App = () => {
  return (
    <div className="App">
      <Switch>
      {/* <img src= {PomeraniaToy} alt=""/> */}
 
        <Route exact path="/" render={() => { return <Home />; }} />
        <Route exact path="/signup" render={() => { return <Signup />;}} />
        <Route exact path="/login" render={() => { return <Login />;}} />
        
      </Switch>
    </div>
  );
};

export default App;
