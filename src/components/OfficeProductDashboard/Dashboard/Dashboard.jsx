import React from 'react';
import Navbar from '../../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

const Dashboard = () => {
    
    return (
        <>
        {/* <Navbar/> */}

        <DashboardSidebar/>
        
        <div className='md:ml-[280px] mt-32 px-5'>
           <Outlet/>
        </div>
            
        </>
    );
};

export default Dashboard;