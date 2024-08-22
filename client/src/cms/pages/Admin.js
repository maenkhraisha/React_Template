import { Link } from "react-router-dom";
import Users from "../components/Users";
import Navbar from "../components/Navbar";

const Admin = () => {
    return (
        <>
            <Navbar />
            <section className="admin">
                <h1>Admins Page</h1>
                <br />
                <Users />
                <br />
                <div className="flexGrow">
                    <Link to="/cms/">Home</Link>
                </div>
            </section>
        </>
    );
};

export default Admin;
