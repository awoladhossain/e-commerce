import { Outlet } from 'react-router-dom';
import ShopHeader from './Header';

const ShoppingLayout = () => {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <ShopHeader />
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default ShoppingLayout;
