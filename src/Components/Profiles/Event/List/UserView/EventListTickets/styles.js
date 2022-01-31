import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'grid',
        padding: theme.spacing(1, 0, 1),
        color: "#FFFFFF",
    },
    
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: "10px",
    },

    cardContent: {
        display: "grid",
        alignItems: "center",
        gridDirection: "row",
        justifyContent: "stretch",
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
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonAction: {
        margin: theme.spacing(0.1, 1, 0.5, 1),
    },

    textBox: {
        margin: theme.spacing(0.1, 1, 0.5, 1),
        justifyContent: 'center'

    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        position: "center",
        //background: '#fff',
        borderRadius: "10px",
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,

    },
}));