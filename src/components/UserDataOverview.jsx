
const UserDataOverview = (props) => {

    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

    const displayUser = props.displayUser

    return (
        <>
            <div className="user-display-info">
                <div className="row">
                    <div className="col">
                        Name: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Email: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.email}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Address: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.address}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Phone: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.phone}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Account created: 
                    </div>
                    <div className="col">
                        {displayUser && listed(displayUser.createdAt)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Active listings: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.activeitems.length}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Pending listings: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.pendingitems.length}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Sold listings: 
                    </div>
                    <div className="col">
                        {displayUser && displayUser.solditems.length}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Balance: 
                    </div>
                    <div className="col">
                        ${displayUser && displayUser.solditems.length}
                    </div>
                </div> <br />
                <div className="row">
                    <div className="col">
                        User SKU: 
                        <input type="text" name="sku" id="sku" 
                            placeholder={displayUser && displayUser.skucode ? displayUser.skucode : 'enter sku'} 
                            // value={displayUser && displayUser.skucode ? displayUser.skucode : 'enter sku'}
                            className="sku"
                        />
                    </div>
                    <div className="col">
                        <button className="btn-sku">Update User SKU</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDataOverview;

