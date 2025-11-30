import React from 'react';
import useRole from '../Hook/useRole';
import Forbiddne from '../Components/Forbiddne/Forbiddne';

const RiderRoutes = ({children}) => {
    const {role,isloading} = useRole()

    if(isloading){
        return <div> <p>Loading...</p> </div>
    }

    if(role.role === 'rider' || role.role === 'admin'){
        return children
    }

    return <Forbiddne/>
};

export default RiderRoutes;