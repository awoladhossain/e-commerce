import { Outlet } from 'react-router-dom';
import AdminHeader from './Header';
import AdminSidebar from './Sidebar';
import { useState } from 'react';

const AdminViewLayout = () => {
    const [openSlidebar, setOpenSlidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <AdminSidebar open={openSlidebar} setOpne={setOpenSlidebar} />
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpne={setOpenSlidebar} />
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminViewLayout;
