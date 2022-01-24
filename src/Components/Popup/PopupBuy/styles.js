import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    popupBox: {
        position: "fixed",
        background: "#00000050",
        backgroundSize: "cover",
        width: "100%",
        height: "109.4vh",
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
        margin: theme.spacing(0, 2, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        // width: 140,
        // height: 40,

    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'

    },
    closeIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignItems: 'flex-end',
        width: '100%'
    },
    containerData: {
        margin: theme.spacing(1, 1, 0, 1),
    },
    icon: {
        width: 70,
        height: 70,
    },
    buttonsContainer: {
        display: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
    },
    buttonLink: {
        backgroundColor: '#0099ff',
        color: "#ffffff",
        '&:hover': {
            backgroundColor: '#008ae6',
            color: '#ffffff',
        },
    },
    amountBox: {
        margin: theme.spacing(1),
    },
}));
