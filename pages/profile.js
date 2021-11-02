import React from 'react';
import MainLayout from "../components/layouts/MainLayouts/MainLayout";
import ProfilePageLayout from '../components/layouts/PageLayouts/ProfilePageLayout';

const profile = () => {
    return (
        <MainLayout>
            <ProfilePageLayout/>
       </MainLayout>
    );
};

export default profile;