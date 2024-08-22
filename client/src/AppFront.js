import { Routes, Route } from "react-router-dom";
import HomeFront from "./pages/HomeFront";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeFront />} />
        </Routes>
    );
}

export default App;
