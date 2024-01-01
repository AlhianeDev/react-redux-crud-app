import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";

import Create from "./components/Create";

import Update from "./components/Update";

function App() {

  return (

    <div className="App">

      <Routes>

        <Route path="/" element={ <Home /> } />

        <Route path="/create" element={ <Create /> } />
        
        <Route path="/update/:userId" element={ <Update /> } />

      </Routes>

    </div>

  );

}

export default App;
