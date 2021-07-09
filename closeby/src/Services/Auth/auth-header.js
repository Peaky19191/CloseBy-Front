export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken ? { Authorization: 'Bearer ' + user.accessToken } : {};
}
