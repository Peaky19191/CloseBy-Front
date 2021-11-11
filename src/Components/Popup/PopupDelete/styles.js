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
        // maxWidth: "30vw",
        marginTop: theme.spacing(15),
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
        margin: theme.spacing(2),
        // width: 140,
        // height: 40,

    },
    containerButton: {
        display: 'flex',
        // alignItems: 'center',
        // width: 'auto',
        // justifyContent: 'center',

    },
    containerData: {
        margin: theme.spacing(3, 1, 1, 1),
    },
    icon: {
        width: 70,
        height: 70,
    },
}));
