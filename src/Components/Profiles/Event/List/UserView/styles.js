import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1, 0, 8),
        color: "#FFFFFF"
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "10px",

    },
    cardMedia: {
        paddingTop: '56.25%'  //16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    buttonPaper: {
        margin: theme.spacing(2, 0, 0),
    },
    spinnerContainer: {
        // position: "absolute",
        // maxWidth: "90vw",
        // margin: theme.spacing("1.5vw", "5vw"),
        // borderRadius: "10px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonAction: {
        margin: theme.spacing(1, 1, 0.5, 1),

    },
}));