import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Editor = () => {
    return (
        <>
            <Navbar />
            <section>
                <h1>Editors Page</h1>
                <br />
                <p>You must have been assigned an Editor role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </>
    );
};

export default Editor;
