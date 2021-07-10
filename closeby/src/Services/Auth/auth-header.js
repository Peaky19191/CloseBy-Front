export default function authHeader() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return profile?.accessToken ? { Authorization: 'Bearer ' + profile.accessToken } : {};
}
