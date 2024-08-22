import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Lounge = () => {
    return (
        <>
            <Navbar />
            <section>
                <h1>The Lounge</h1>
                <br />
                <p>Admins and Editors can hang out here.</p>
                <div className="flexGrow">
                    <Link to="/cms/">Home</Link>
                </div>
            </section>
        </>
    );
};

export default Lounge;
