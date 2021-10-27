import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        justifyContent: 'center',
    },
    select: {
        margin: 8,
    },
    container: {
        position: "absolute",
        maxWidth: "28vw",
        margin: theme.spacing("2vw", "36vw"),
    },
    bottomButton: {
        margin: theme.spacing(1),
        variant: "contained",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));
