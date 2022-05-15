import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./pages/Hero";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/uploads" element={<Upload/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
