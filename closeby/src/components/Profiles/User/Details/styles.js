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
        width: "30%",
        height: "auto",
        marginTop: "18vh",
        marginLeft: "70vh",
        background: '#fff',
        borderRadius: "10px",
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
    buttonEditSave: {
        margin: theme.spacing(3, 0, 0),
        width: '70%',
        marginLeft: "9vh",
        backgroundColor: '#00b300',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: '#006600',
            color: '#ffffff',
        },

    },
    buttonEditStop: {
        margin: theme.spacing(2, 0, 0),
        width: '70%',
        marginLeft: "9vh",

    },
    buttonEditStart: {
        margin: theme.spacing(3, 0, 0),
        width: '70%',
        marginLeft: "9vh",

    },
    buttonClose: {
        margin: theme.spacing(2, 0, 1),
        width: '70%',
        marginLeft: "9vh",
    },

}));