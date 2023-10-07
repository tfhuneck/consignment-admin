import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Users from "./components/Users";
import UserListings from "./components/UserListings";

export const UserContext = createContext();

function App() {

  const [ displayUser, setDisplayUser ]   = useState();

  return (
    <>
      <UserContext.Provider value={[ displayUser, setDisplayUser ]} >
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
              <Route path='/listings' element={ < UserListings />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
