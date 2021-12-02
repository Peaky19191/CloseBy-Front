import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        // position: "absolute",
        // maxWidth: "28vw",
        // margin: theme.spacing("2vw", "36vw"),
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
        backgroundColor: '#00b300',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: '#006600',
            color: '#ffffff',
        },
    },
    buttonEditStop: {
        margin: theme.spacing(2, 0, 0),
    },
    buttonEditStart: {
        margin: theme.spacing(2, 0, 0),
    },
    buttonClose: {
        margin: theme.spacing(2, 0, 0),
    },
    buttonsContainer: {
        display: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCompanyDetails: {
        margin: theme.spacing(2, 0, 0),
        backgroundColor: '#0099ff',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: '#008ae6',
            color: '#ffffff',
        },
    },
}));