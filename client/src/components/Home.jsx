import axios from "axios";
import AllListings from "./AllListings";
import { useFetchData } from "./hooks/useFetchData";

const Home = () => {

    // fetch Analysis Data hook
    const {userData} = useFetchData('/analysis');
    console.log(userData)

    const serverUrl = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;

    const connectEbay = async () => {
        await axios.get(
            // serverUrl +
            '/ebayauth')
        .then((res) => {
            console.log(res.data)
            window.location.href = res.data 
        })
        .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="card home-dash">
                <h4 className="mt-4">Admin Dashboard Home</h4>
                <div className="container dash-headers">
                    <div className="row">
                        <div className="col dash-header">
                            <h4>Active Listings</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        Total:
                                    </div>
                                    <div className="col dash-nums time-left">
                                        {userData ? userData[0].activesum : null }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Total Amount:
                                    </div>
                                    <div className="col dash-nums price">
                                        {userData ? `$ ${userData[0].activeamount}` : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col dash-header">
                            <h4>Pending Listings</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        Total:
                                    </div>
                                    <div className="col dash-nums time-left">
                                        {userData ? userData[0].pendingsum : null }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Total Amount:
                                    </div>
                                    <div className="col dash-nums price">
                                        {userData ? `$ ${userData[0].pendingamount}` : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col dash-header">
                            <h4>Sold Listings</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        Total:
                                    </div>
                                    <div className="col dash-nums time-left">
                                        {userData ? userData[0].soldsum : null }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Total Amount:
                                    </div>
                                    <div className="col dash-nums price">
                                        {userData ? `$ ${userData[0].soldamount}` : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col dash-header">
                            <h4>Unsold Listings</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        Total:
                                    </div>
                                    <div className="col dash-nums time-left">
                                        {userData ? userData[0].unsoldsum : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col dash-header">
                            <h4>Users</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        Total:
                                    </div>
                                    <div className="col dash-nums time-left">
                                        {userData ? userData[0].users : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col dash-header">
                            <h4>Data Updated</h4>
                            <div className="dash-box">
                                <div className="row">
                                    <div className="col">
                                        updated at:
                                    </div>
                                    <div className="col">
                                        {userData ? (userData[0].updatedAt).replace('T', ' ') : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col dash-header">
                        <h4>Misc</h4>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    Click button to authorize app with ebay account
                                </div>
                                <div className="col">
                                    <button className="btn btn-users-action mb-2" onClick={connectEbay} >Connect & Authorize ebay</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <AllListings />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;