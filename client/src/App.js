import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/LogReg';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home/:id" element={<Dashboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
