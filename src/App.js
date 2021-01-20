import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './components/signup';
import Signin from './components/signin';
import Home from './components/screen/home'
function App() {
  return (
    <Router>
       <Route path='/signup' component={Signup}/>
       <Route path='/signin' component={Signin}/>
       <Route path='/home' component={Home}/>
    </Router>  
  );
}

export default App;
