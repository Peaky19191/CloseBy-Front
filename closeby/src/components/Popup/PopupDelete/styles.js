import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    popupBox: {
        position: "absolute",
        background: "#00000050",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
    },
    container: {
        position: "fixed",
        maxWidth: "30vw",
        margin: theme.spacing("10vw", "35vw"),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: "10px",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(4),
        width: 100,
        height: 40,
    },
    containerButton: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        justifyContent: 'center',
    },
    icon: {
        width: 70,
        height: 70,
    },
}));
