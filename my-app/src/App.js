import './App.css';
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import User from './User';
import Task from './Task';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<User />} ></Route>
   </Routes>
   <Routes>
    <Route path='task' element={<Task /> }></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
