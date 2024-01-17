import { useState, useEffect } from "react";
import axios from "axios";

const UserDataOverview = (props) => {

    const [ sku, setSku] = useState('');

    const handleSku = (e) => {
        setSku(e.target.value);
    }

    const displayUser = props.displayUser
    const serverUrl     = 'http://localhost:8090' || `${process.env.REACT_APP_production_url}`;

    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

    useEffect(() => {
        if(displayUser) setSku('');
    }, [displayUser])

    const updateSku = async () => {
        const load = document.getElementById('sku-load')
        let userId = displayUser.userid;
        console.log(sku + userId)
        if (sku){
            load.style.display = 'block'
            await axios.post('/updatesku', {
                'userid' : userId,
                'sku' : sku,
            })
            .then(async res => {
                console.log('SKU updated');
                alert('User Sku updated');
                window.location.reload(); 
            })
            .catch(err => console.log(err));
        } else {
            alert('no sku entered')
        }
    }


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
                    <div className="col balance">
                        {displayUser && `$ ${displayUser.currentbalance.toFixed(2)}`}
                    </div>
                </div> <br />
                <div className="row">
                    <div className="col">
                        User SKU: 
                        <input type="text" name="sku" id="sku" 
                            placeholder={displayUser && displayUser.skucode ? displayUser.skucode : 'enter sku'}
                            // defaultValue={displayUser && displayUser.skucode ? displayUser.skucode : 'enter sku'} 
                            className="sku"
                            onChange={handleSku}
                        />
                    </div>
                    <div class="spinner-border text-light" id="sku-load" role="status">
                    </div>
                    <div className="col">
                        <button 
                            className="btn btn-users-action" 
                            onClick={updateSku}
                        >
                            Update User SKU
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDataOverview;

