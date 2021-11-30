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
    buttonClose: {
        margin: theme.spacing(2, 0, 1),

    },
    buttonsContainer: {
        display: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCompanyDetails: {
        margin: theme.spacing(2, 0, 0),
    },
}));