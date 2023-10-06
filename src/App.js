import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Users from "./components/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container-fluid'>
              <div className='row'>
                <div className='col-sm-2 fixed-top one'>
                  <Nav />
                </div>
              </div>
          <Routes>
            <Route path="/" element={ <Home/> } /> 
            <Route path="/users" element={ <Users/> } /> 
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
