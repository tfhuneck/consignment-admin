import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/Users";
import UserListings from "./components/UserListings";
import CashoutTransactions from "./components/UserTransactions";
import firebaseAuth from "./config/firebase-config";
import CashoutRequests from "./components/Requests";


export const UserContext = createContext();
export const AuthContext = createContext();

function App() {

  // Firebase Authorization
  const auth                      = getAuth(firebaseAuth);
  const [ userAuth, setUserAuth ] = useState(null);

  const [ displayUser, setDisplayUser ]   = useState();

  useEffect (() => {
    onAuthStateChanged(auth, async (user) => {
      var token = ''
      if (user) {
        await user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          token = idToken
        }).catch(function(error) {
          // Handle error
        });
        const userid = user.uid;
        const userData = {
          idToken : token,
          userid : userid
        }
        setUserAuth(userData);
      } else {
        setUserAuth(null);
        // console.log(userAuth)
      }
    });
  }, [onAuthStateChanged, auth]);

  return (
    <>
      <AuthContext.Provider value={[ userAuth, setUserAuth ]}>
        <UserContext.Provider value={[ displayUser, setDisplayUser ]} >
          <BrowserRouter>
            <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-sm-2 fixed-top one'>
                      {userAuth && <Nav />}
                    </div>
                  </div>
              <Routes>
                <Route path="/" element={ <Login/> } /> 
                <Route path="/dash" element={ <Home/> } /> 
                <Route path="/users" element={ <Users/> } /> 
                <Route path='/listings' element={ < UserListings />} />
                <Route path='/transactions' element={ < CashoutTransactions />} />
                <Route path='/cashouts' element={ < CashoutRequests />} />
              </Routes>
            </div>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
