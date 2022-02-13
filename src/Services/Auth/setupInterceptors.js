import { logout, newAccessToken, newRefreshToken } from "../../Actions/auth";
import axiosInstance from "./apiInstance";
import TokenService from "./token.service";

const setup = (store, history) => {

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
            console.log("originalConfig")
            console.log(originalConfig)
            console.log("err.response")
            console.log(err.response)
            console.log("originalConfig.url")
            console.log(originalConfig.url)

            if (originalConfig.url !== "/identity/refresh-access-token" && originalConfig.url !== "/identity/login" && err.response) {
                console.log("err.response.status")
                console.log(err.response.status)
                console.log("originalConfig._retry")
                console.log(originalConfig._retry)

                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    console.log("2if")

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
                        console.log("111")
                        console.log(_error)
                        console.log(_error.response)

                        // window.location.reload();

                        dispatch(logout());

                        history.push('/login');
                        // window.location.reload();

                        return Promise.reject(_error);
                    }
                }
                console.log("2If not")
            }
            console.log("222")
            console.log(err)
            console.log(err.response)
            // history.push('/login');
            // window.location.reload();
            // dispatch(logout());
            // dispatch(clearMessage());

            // <Redirect to="/eventList" /> 

            return Promise.reject(err);
        }
    );
};

export default setup;