//------------------IMPORTS---------------------//

import './App.css';
import React from 'react';
import { Route, Switch  } from 'react-router-dom';

//----------------IMPORT COMPONENTS--------------//
import Home from './componets/Home/Home';
import LandingPage from './componets/LandingPage/LandingPage';
import Create from './componets/Create/Create';
import Detail from './componets/Detail/Detail';

//-----------------FUNCTION--------------//
function App() {
  return (
    <div className="App">
      
      <Switch>

         <Route path='/home/create' component={ Create } ></Route>
         <Route exact path='/home/:cca3' component={ Detail }></Route>
         <Route path='/home' component={ Home } ></Route>
         <Route path='/' component={ LandingPage } ></Route>

      </Switch>

    </div>
  );
}

export default App;
