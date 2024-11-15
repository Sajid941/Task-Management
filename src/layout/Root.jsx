import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <main className="max-w-6xl mx-auto">
            <Outlet />
        </main>
    );
};

export default Root;
