
const UsersList = ({userData, setDisplayUser}) => {

    return (
        <>
            {userData && userData.map((user, key) => {
                return(
                    <>
                        <div 
                            className="users-list" 
                            id={`${user.userid}`} 
                            key={key} 
                            onClick={() => setDisplayUser(userData[key])}
                        >
                            <span className="users-list-name" >
                                {user.name} 
                            </span> <br />
                            <span className="users-list-name" >
                                sku: {user.skucode}
                            </span> <br />
                            <span className="users-list-name" >
                                Email: {user.email}
                            </span>
                            
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default UsersList;