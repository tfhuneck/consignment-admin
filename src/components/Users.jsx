import avatar from '../images/avatar.png'
import UserDataOverview from "./UserDataOverview";
import UsersList from "./UsersList";
import UserListings from './UserListings';
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useSetUserDisplay } from "./hooks/useSetUserDisplay";
import { useUserList } from './hooks/useUserList';
import { Link } from 'react-router-dom';

const Users = () => {

    // Fetches all user data
    const { userData }                      = useFetchUserData();
    
    // Custom hook sets which user is displayed
    const {displayUser, setDisplayUser}     = useUserList(userData);
    
    // Custom hook that handles what window is displayed for user account
    const [ display, setDisplay ]           = useSetUserDisplay();

    return (
        <>
            <div className="card home-dash container-fluid">
                <div className="row users-row">
                    <div className="col-4 users-left">
                        <div className="container users-left">
                            <div className="row">
                                <div className="col d-flex mt-3">
                                    <h4>
                                        USERS
                                    </h4>
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <input placeholder="Search" className="search" name="text" type="text" 
                                    // value={searchValue} onChange={handleSearch}
                                    />
                                    <svg className="clear-search" 
                                        // onClick={clearSearch} 
                                        fill="#CFE6FC" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex ">
                                    <div className="users-box">
                                        <UsersList userData={userData} setDisplayUser={setDisplayUser} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="user-display container">
                            <div className="row">
                                <div className="col">
                                    <img className='profile-page-img' src={avatar} />
                                </div>
                                <div className="col">
                                    <button className="btn-user-page" id="overview" onClick={() => setDisplay('overview')} >Overview</button>
                                </div>
                                <div className="col">
                                    <button className="btn-user-page" id="balance" onClick={() => setDisplay('balance')} >Balance</button>
                                </div>
                                <div className="col">
                                    <Link to='/listings' >
                                        <button className="btn-user-page" id="listings" >Listings</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <h5> {displayUser && displayUser.name}</h5>
                                </div>
                            </div>
                            {display === 'overview' &&  
                                <UserDataOverview displayUser = {displayUser} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;