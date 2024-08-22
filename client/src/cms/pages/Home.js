import { useState } from "react";
import { Popup } from "../../components/Popup";
import Modal from "../../components/Modal";

import TestCom from "../components/TestCom";
import Navbar from "../components/Navbar";

export default function Home() {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState();

    function showModal(value) {
        setUsername(value);
        setModal(true);
    }

    return (
        <>
            <Modal
                openModal={modal}
                children={<TestCom props={username} />}
                closeModal={() => setModal(false)}
            ></Modal>
            <Navbar />
            <section className="content">
                <h1>Home Page</h1>
                <button className="btn" onClick={() => setOpen(true)}>
                    {" "}
                    Click to Open Popup
                </button>
                {open && <Popup text={"hellloooo popup"} closePopup={() => setOpen(false)} />}

                <br />
                <br />
                <br />
                <div className="line"></div>
                <br />
                <br />
                <ul>
                    <li className="m-2">
                        <span>maen</span>
                        <button
                            className="btn"
                            value={"maen"}
                            onClick={(e) => showModal(e.target.value)}
                        >
                            Open modal
                        </button>
                    </li>
                    <li className="m-2">
                        <span>tyma</span>
                        <button
                            className="btn"
                            value={"tyma"}
                            onClick={(e) => showModal(e.target.value)}
                        >
                            Open modal
                        </button>
                    </li>
                    <li className="m-2">
                        <span>malek</span>
                        <button
                            className="btn"
                            value={"malek"}
                            onClick={(e) => showModal(e.target.value)}
                        >
                            Open modal
                        </button>
                    </li>
                    <li className="m-2">
                        <span>jamal</span>
                        <button
                            className="btn"
                            value={"jamal"}
                            onClick={(e) => showModal(e.target.value)}
                        >
                            Open modal
                        </button>
                    </li>
                    <li className="m-2">
                        <span>mansour</span>
                        <button
                            className="btn"
                            value={"mansour"}
                            onClick={(e) => showModal(e.target.value)}
                        >
                            Open modal
                        </button>
                    </li>
                </ul>
            </section>
        </>
    );
}
