const getLocalRefreshToken = () => {
    const profil = JSON.parse(localStorage.getItem("profil"));
    return profil?.refreshToken;
};

const getLocalAccessToken = () => {
    const profil = JSON.parse(localStorage.getItem("profil"));
    return profil?.accessToken;
};

const updateLocalAccessToken = (token) => {
    let profil = JSON.parse(localStorage.getItem("profil"));
    profil.accessToken = token;
    localStorage.setItem("profil", JSON.stringify(profil));
};

const getProfile = () => {
    return JSON.parse(localStorage.getItem("profil"));
};

const setProfile = (profil) => {
    localStorage.setItem("profil", JSON.stringify(profil));
};

const removeProfile = () => {
    localStorage.removeItem("profil");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getProfile,
    setProfile,
    removeProfile,
};

export default TokenService;