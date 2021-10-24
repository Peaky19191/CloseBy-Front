import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    popupBox: {
        position: "fixed",
        background: '#00000050',
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        position: "center",
        width: "50%",
        height: "auto",
        marginTop: "18vh",
        marginLeft: "50vh",
        background: '#fff',
        borderRadius: "4px",
        overflow: "auto",
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    booton: {
        margin: theme.spacing(3, 0, 2),
    },
}));