import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ExAntd from "./ExAntd";
import Example from "./Example";
import Settings from "./list/Settings";
import UserPage from "./list/UserPage";
import ManageStress from "./list/ManageStress";
import Part from "./compo/Part";
import Part2 from "./compo/Part2";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Settings />}></Route>
          <Route path="/part/*" element={<Part />}></Route>
          <Route path="/settings/*" element={<Settings />}></Route>
          <Route path="/usrpage/*" element={<UserPage />}></Route>
          <Route path="/stress/*" element={<ManageStress />}></Route>
          <Route path="*"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
