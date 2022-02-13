import { useHistory } from "react-router-dom";
import { logout, newAccessToken, newRefreshToken } from "../../Actions/auth";
import axiosInstance from "./apiInstance";
import TokenService from "./token.service";

const Setup = (store) => {
    const history = useHistory();

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== "/identity/refresh-access-token" && originalConfig.url !== "/identity/login" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await axiosInstance.put("/identity/refresh-access-token", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                            accessToken: TokenService.getLocalAccessToken(),
                        });
                        const accessToken = rs.data.accessToken;
                        const refreshToken = rs.data.refreshToken;

                        dispatch(newAccessToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);

                        dispatch(newRefreshToken(refreshToken));
                        TokenService.updateLocalRefreshToken(refreshToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        history.push("/");
                        // window.location.reload();
                        dispatch(logout());
                        return Promise.reject(_error);
                    }
                }
            }
            history.push("/");
            // window.location.reload();
            dispatch(logout());
            return Promise.reject(err);
        }
    );
};

export default Setup;