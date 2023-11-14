import axios from "axios";

const Home = () => {

    const connectEbay = async () => {
        axios.get('/ebayauth')
    }

    return (
        <>
            <div className="card home-dash">
                <div className="container">
                    <div className="row">
                        <button className="btn btn-users-action home-dash-btns" onClick={connectEbay} >Connect to ebay</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-users-action home-dash-btns">Update Data Call</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;