import Register from "./cms/pages/Register";
import Login from "./cms/pages/Login";
import Home from "./cms/pages/Home";
import Layout from "./cms/pages/Layout";
import Editor from "./cms/pages/Editor";
import Admin from "./cms/pages/Admin";
import Missing from "./cms/pages/Missing";
import Unauthorized from "./cms/Unauthorized";
import Lounge from "./cms/pages/Lounge";
import LinkPage from "./cms/pages/LinkPage";
import RequireAuth from "./cms/RequireAuth";
import PersistLogin from "./cms/PersistLogin";
import { Routes, Route } from "react-router-dom";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

function App() {
    return (
        <>
            <Routes>
                <Route path="/cms/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="/cms/login" element={<Login />} />
                    <Route path="/cms/unauthorized" element={<Unauthorized />} />

                    {/* we want to protect these routes */}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="/cms/admin" element={<Admin />} />
                            <Route path="/cms/register" element={<Register />} />
                            <Route path="/cms/" element={<Home />} />
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                            <Route path="/cms/editor" element={<Editor />} />
                        </Route>

                        <Route
                            element={
                                <RequireAuth
                                    allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]}
                                />
                            }
                        >
                            <Route path="/cms/linkpage" element={<LinkPage />} />
                            <Route path="/cms/lounge" element={<Lounge />} />
                        </Route>
                    </Route>

                    {/* catch all */}
                    <Route path="/cms/*" element={<Missing />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
