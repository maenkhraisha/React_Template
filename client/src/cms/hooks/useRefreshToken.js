import axios from "../../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });

        console.log("response ==============");
        console.log(response.data.accessToken);
        console.log("response ==============");

        setAuth((prev) => {
            console.log("prev ------------------------");
            console.log(JSON.stringify(prev));
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
