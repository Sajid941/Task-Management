import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
    return (
        <main className="max-w-6xl mx-auto">
            <Outlet />
            <ToastContainer />
        </main>
    );
};

export default Root;
