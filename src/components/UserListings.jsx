

const UserListings = () => {

    return (
        <>
            <div className="user-display-info container-fluid">
                <div className="row d-flex justify-content-center" >
                    <button className="btn-user-page" id="active"  >Active Listings</button>
                </div>
                <div className="row d-flex justify-content-center" >
                    <button className="btn-user-page" id="pending"  >Pending Listings</button>
                </div>
                <div className="row d-flex justify-content-center" >
                    <button className="btn-user-page" id="sold"  >Sold Listings</button>
                </div>
            </div>
        </>
    )
}

export default UserListings;