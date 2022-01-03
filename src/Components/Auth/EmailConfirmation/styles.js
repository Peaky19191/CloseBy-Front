import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: "10px",

    },
    container: {
        // position: "absolute",
        // maxWidth: "30vw",
        // margin: theme.spacing("2vw", "35vw"),
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },

    alert: {
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        justifyContent: 'center',
    },
}));