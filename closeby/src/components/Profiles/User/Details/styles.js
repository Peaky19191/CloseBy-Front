import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        position: "absolute",
        maxWidth: "28vw",
        margin: theme.spacing("2vw", "36vw"),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        position: "center",
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
        margin: theme.spacing(2, 0, 0),
        width: '70%',
        marginLeft: "8vh",
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
        marginLeft: "8vh",

    },
    buttonEditStart: {
        margin: theme.spacing(3, 0, 0),
        width: '70%',
        marginLeft: "8vh",

    },
    buttonClose: {
        margin: theme.spacing(2, 0, 1),
        width: '70%',
        marginLeft: "8vh",
    },
}));