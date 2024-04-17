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
import axios from 'axios';

export const UserContext = createContext();
export const AuthContext = createContext();
export const ListingContext = createContext();

function App() {

  // Firebase Authorization
  const auth                              = getAuth(firebaseAuth);
  const serverUrl                         = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;
  const [ userAuth, setUserAuth ]         = useState(null);
  const [ listingData, setListingData ]   = useState(null);
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
        // const userid = user.uid;
        const userData = {
          idToken : token,
          // userid : userid,
        }
        setUserAuth(userData);
        let userAuth= userData;
        console.log(userAuth)
        await axios.get(
          // serverUrl +
          '/listingdata',
          {params:{
                  userAuth
          }})
          .then(async res => {
              let data = (res.data);
              setListingData(data);
          })
          .catch(err => console.log(err));
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
          <ListingContext.Provider value={[ listingData, setListingData ]}>
            <BrowserRouter>
              <div className='container-fluid wrapper'>
                <div className='row'>
                  <div className='col col-md-1 fixed-top one'>
                    {userAuth && <Nav />}
                  </div>
                  <div className="col">
                  <Routes>
                    <Route path="/" element={ <Login/> } /> 
                    {userAuth && <Route path="/dash" element={ <Home/> } /> }
                    {userAuth && <Route path="/users" element={ <Users/> } /> }
                    {userAuth && <Route path='/listings/:userid' element={ < UserListings />} />}
                    {userAuth && <Route path='/transactions/:userid' element={ < CashoutTransactions />} />}
                    {userAuth && <Route path='/cashouts' element={ < CashoutRequests />} />}
                  </Routes>
                  </div>
                  </div>
              </div>
            </BrowserRouter>
          </ListingContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
