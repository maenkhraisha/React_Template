import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const UPDATE_URL = "/users";

function UserEdit({ props }) {
    const [id, setId] = useState(props);
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();

    const [checkedUser, setCheckedUser] = useState(false);
    const [checkedAdmin, setCheckedAdmin] = useState(false);
    const [checkedEditor, setCheckedEditor] = useState(false);
    const [roles, setRoles] = useState();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${id}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, []);

    useEffect(() => {
        getroles(user);
    }, [user]);

    const handleUser = () => {
        if (checkedUser) {
            delete roles.User;
            setCheckedUser(false);
        } else {
            setRoles((prev) => ({
                ...prev,
                User: "2001",
            }));
            setCheckedUser(true);
        }
    };
    const handleEditor = () => {
        if (checkedEditor) {
            delete roles.Editor;
            setCheckedEditor(false);
        } else {
            setRoles((prev) => ({
                ...prev,
                Editor: "1984",
            }));
            setCheckedEditor(true);
        }
    };
    const handleAdmin = () => {
        if (checkedAdmin) {
            delete roles.Admin;
            setCheckedAdmin(false);
        } else {
            setRoles((prev) => ({
                ...prev,
                Admin: "5150",
            }));
            setCheckedAdmin(true);
        }
    };

    const getroles = (user) => {
        if (user?.roles) {
            for (const [key, value] of Object.entries(user.roles)) {
                if (key == "User") {
                    handleUser();
                }
                if (key == "Editor") {
                    handleEditor();
                }
                if (key == "User") {
                    handleAdmin();
                }
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(UPDATE_URL, JSON.stringify({ user, roles }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            if (!err?.response) {
                // setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                // setErrMsg("Username Taken");
            } else {
                // setErrMsg("Registration Failed");
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <input value={user?.username} placeholder={user?.username} /> */}
                {/* <input type="text" id="id" value={user?._id} /> */}
                <div className="input-group">
                    <div>
                        <input
                            id="user"
                            type="checkbox"
                            checked={checkedUser}
                            onChange={handleUser}
                        />
                        <label htmlFor="user">User</label>
                    </div>

                    <div>
                        <input
                            id="editor"
                            type="checkbox"
                            checked={checkedEditor}
                            onChange={handleEditor}
                        />
                        <label htmlFor="editor">Editor</label>
                    </div>

                    <div>
                        <input
                            id="admin"
                            type="checkbox"
                            checked={checkedAdmin}
                            onChange={handleAdmin}
                        />
                        <label htmlFor="admin">Admin</label>
                    </div>
                </div>

                <button onClick={handleSubmit}>Update</button>
            </form>
        </>
    );
}

export default UserEdit;
