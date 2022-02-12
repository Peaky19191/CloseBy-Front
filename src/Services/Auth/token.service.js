const getLocalRefreshToken = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return profile?.refreshToken;
};

const getLocalAccessToken = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return profile?.accessToken;
};

const updateLocalAccessToken = (token) => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    profile.accessToken = token;
    localStorage.setItem("profile", JSON.stringify(profile));
};

const updateLocalRefreshToken = (token) => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    profile.refreshToken = token;
    localStorage.setItem("profile", JSON.stringify(profile));
};

const getProfile = () => {
    return JSON.parse(localStorage.getItem("profile"));
};

const setProfile = (profile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
};

const removeProfile = () => {
    localStorage.removeItem("profile");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    updateLocalRefreshToken,
    getProfile,
    setProfile,
    removeProfile,
};

export default TokenService;