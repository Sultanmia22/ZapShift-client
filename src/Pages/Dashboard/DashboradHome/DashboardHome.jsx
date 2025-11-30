import React from 'react';
import useRole from '../../../Hook/useRole';
import AdminDashHome from './AdminDashHome';
import RiderDashHome from './RiderDashHome';
import UserDashHome from './UserDashHome';

const DashboardHome = () => {

    const {role,isLoading} = useRole()
    console.log(role)

    if(isLoading){
        return <p>Loading...</p>
    }

    else if(role.role === 'admin'){
        return <AdminDashHome/>
    }

    else if(role.role === 'rider'){
        return <RiderDashHome/>
    }

   else{
    return <UserDashHome/>
   }
  
};

export default DashboardHome;