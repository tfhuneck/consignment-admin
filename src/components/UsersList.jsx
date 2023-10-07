
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
                                user: {user.name} 
                            </span> <br />
                            <span className="users-list-name" >
                                email: {user.email}
                            </span>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default UsersList;