import React from 'react';
import useRole from '../Hook/useRole';
import Forbiddne from '../Components/Forbiddne/Forbiddne';

const AdminRoutes = ({children}) => {
   const {role,isLoading} = useRole()

   if(isLoading){
    return <p> Loading... </p>
   }

   if(role.role === 'admin'){
    return children
   }

   return <Forbiddne/>
};

export default AdminRoutes;