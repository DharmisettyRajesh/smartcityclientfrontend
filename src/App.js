import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Header from './Components/Header.js';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {Stateprovider} from './Components/Stateprovider';
import Reducer, {initialState} from './InitialState.js';
import Videocall from './Components/Videocall';
import Problem from './Components/Problem';

const App=()=>{
  return (
    <Stateprovider initialstate={initialState} reducer={Reducer}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" exact>
            <Header />
              <Login />
            </Route>
            <Route path="/signup" exact>
            <Header />
              <Signup />
            </Route>
            <Route path="/videocall" exact>
              <Videocall />
            </Route>
            <Route path="/uproblem" exact>
              <Problem />
            </Route>
            <Route path="/">
              <Header />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Stateprovider>
  );  
}
export default App;