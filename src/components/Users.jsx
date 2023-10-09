import avatar from '../images/avatar.png'
import UserDataOverview from "./UserDataOverview";
import UsersList from "./UsersList";
import UserListings from './UserListings';
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useSetUserDisplay } from "./hooks/useSetUserDisplay";
import { useUserList } from './hooks/useUserList';
import { Link } from 'react-router-dom';
import { useSearch } from './hooks/useSearch';
import Search from './Search';

const Users = () => {

    // Fetches all user data
    const { userData }                      = useFetchUserData();
    
    // Custom hook sets which user is displayed
    const {displayUser, setDisplayUser}     = useUserList(userData);

    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);
    
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
                                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} searchClass={'users-search'} clearClass={'clear-search-users'} />
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