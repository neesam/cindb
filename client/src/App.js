import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/LogReg';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import EditUser from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home/:userName" element={<Dashboard/>}/>
            <Route path="/user/:userName" element={<ProfilePage/>}/>
            <Route path="/user/edit/:user" element={<EditUser/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
