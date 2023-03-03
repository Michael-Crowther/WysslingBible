import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import InputFeild from './components/InputFeild';
import General from './pages/General';
import Folders from "./pages/Folders";
import SendToEngineers from "./pages/SendToEngineers";
import ErrorRatePolicy from "./pages/ErrorRatePolicy";
import Templates from "./pages/Templates";
import RoofFraming from "./pages/RoofFraming";
import CodesWindSnow from "./pages/CodesWindSnow";
import Database from "./pages/Database";
import GroundMounts from "./pages/GroundMounts";
import AttachmentsScrews from "./pages/AttachmentsScrews";
import Calculations from "./pages/Calculations";
import './App.css';

const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string>("");
  const [showLink, setShowLink] = useState(true);

  const location = useLocation();
  //The location and useEffect here is to toggle the setShowLink when we return to the home page from other pages
  useEffect(() => {
    if (location.pathname === '/') {
      setShowLink(true);
    }
  }, [location]);

  return (
    <div className="App">
      <span className="heading">QA / QC Bible</span>

      <InputFeild todo={todo} setTodo={setTodo} />

      {showLink && <h1 className="commandmentHeader">Commandments</h1>}

      <div className="commandments">
        <Routes>
          <Route path="/" />
          <Route path="/general" element={<General />} />
          <Route path="/errorRatePolicy" element={<ErrorRatePolicy />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/sendToEngineers" element={<SendToEngineers />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/roofFraming" element={<RoofFraming />} />
          <Route path="/codesWindSnow" element={<CodesWindSnow />} />
          <Route path="/database" element={<Database />} />
          <Route path="/attachmentsScrews" element={<AttachmentsScrews />} />
          <Route path="/groundMounts" element={<GroundMounts />} />
          <Route path="/calculations" element={<Calculations />} />
        </Routes>
        <div className="grid-container">
          {showLink && <Link className="grid-item" to="/general" onClick={() => setShowLink(false)}>SLA / General</Link>}
          {showLink && <Link className="grid-item" to="/errorRatePolicy" onClick={() => setShowLink(false)}>Error Rate Policy</Link>}
          {showLink && <Link className="grid-item" to="/folders" onClick={() => setShowLink(false)}>Folders</Link>}
          {showLink && <Link className="grid-item" to="/sendToEngineers" onClick={() => setShowLink(false)}>Send to Engineers</Link>}
          {showLink && <Link className="grid-item" to="/templates" onClick={() => setShowLink(false)}>Templates</Link>}
          {showLink && <Link className="grid-item" to="/roofFraming" onClick={() => setShowLink(false)}>Roof Framing</Link>}
          {showLink && <Link className="grid-item" to="/codesWindSnow" onClick={() => setShowLink(false)}>Codes / Wind / Snow</Link>}
          {showLink && <Link className="grid-item" to="/database" onClick={() => setShowLink(false)}>AHJ Database</Link>}
          {showLink && <Link className="grid-item" to="/attachmentsScrews" onClick={() => setShowLink(false)}>Attachments / Screws</Link>}
          {showLink && <Link className="grid-item" to="/groundMounts" onClick={() => setShowLink(false)}>Ground Mounts</Link>}
          {showLink && <Link className="grid-item" to="/calculations" onClick={() => setShowLink(false)}>Calculations</Link>}
        </div>
      </div>
    </div>
  );
}

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
