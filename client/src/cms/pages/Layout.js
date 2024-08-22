import { Outlet } from "react-router-dom";

import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const Layout = () => {
    return (
        <main className="App">
            <ToastContainer />
            <Outlet />
        </main>
    );
};

export default Layout;
