import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/LogReg';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import EditUser from './components/EditProfile';
import MovieForm from "./components/ReviewForm";
import EditMovie from "./components/EditReview";
import MovieDetails from "./components/ReviewDetails";

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
            <Route path="/newRating/:userName" element={<MovieForm />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/details/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
