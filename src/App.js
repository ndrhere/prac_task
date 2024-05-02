import './App.css';
import Blogs from './Components/Blogs';
import Login from './Components/Login';
import Register from './Components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
<Router>


  <Routes>

  <Route exact path = '/' element = {<Register/>}></Route>
  <Route exact path = '/login' element = {<Login/>}></Route>
  <Route exact path = '/blogs' element = {<Blogs/>}></Route>

  </Routes>


</Router>





     
     
    </div>
  );
}

export default App;
