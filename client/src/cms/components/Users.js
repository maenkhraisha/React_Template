import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Modal from "../../components/Modal";
import UserEdit from "./UserEdit";
import notify from "./Notify";

const Users = () => {
    const [users, setUsers] = useState();
    const [id, setId] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [modal, setModal] = useState(false);

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get("/users");

            setUsers(response.data);
        } catch (err) {
            console.error(err);
            navigate("/cms/", { state: { from: location }, replace: true });
        }
    };
    useEffect(() => {
        getUsers();
    }, []);

    const handleDelete = (id, username) => {
        const userID = id;
        const deleteuser = async () => {
            try {
                const response = await axiosPrivate.delete("/users", {
                    data: {
                        id: userID,
                    },
                });

                getUsers();
                notify("user " + response.data.username + " deleted successfully");
            } catch (error) {
                console.error(error);
            }
        };

        confirmAlert({
            title: "Confirm to Delete",
            message: `Are you sure to delete user ${username}`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteuser(),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const getroles = (user) => {
        let result = "";

        if (user.roles) {
            for (const [key, value] of Object.entries(user.roles)) {
                result += `${key} `;
            }
        }

        return result;
    };

    function showModal(value) {
        setId(value);
        setModal(true);
    }

    return (
        <>
            {modal && (
                <Modal
                    openModal={modal}
                    children={<UserEdit props={id} />}
                    closeModal={() => setModal(false)}
                ></Modal>
            )}
            <article>
                <h3>Users List</h3>
                {users?.length ? (
                    <ul>
                        {users.map((user, i) => (
                            <li key={i}>
                                <div>
                                    <span>{user?.username}</span> / <span>{getroles(user)}</span>
                                </div>
                                <div>
                                    <button
                                        className="btn"
                                        value={user._id}
                                        onClick={(e) => showModal(e.target.value)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => handleDelete(user._id, user.username)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users to display</p>
                )}
            </article>
        </>
    );
};

export default Users;
