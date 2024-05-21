import React from 'react';
import ProfilePage from './profile/page';

const Dashboard = () => {
    return (
        <div  suppressHydrationWarning={true}>
            <ProfilePage/>
        </div>
    );
};

export default Dashboard;