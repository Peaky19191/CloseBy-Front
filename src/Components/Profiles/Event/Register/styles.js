import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        // position: "absolute",
        maxWidth: "75%",
        // margin: theme.spacing("2vw", "36vw"),
        // width: "90vw",
        // height: "40vw",
    },
    paper: {
        padding: theme.spacing(2),
        borderRadius: "10px",
        // width: "100%",
        // height: "100%",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: theme.spacing(1),
    },


    mapContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // padding: theme.spacing(2),
        // width: "100vh",
        height: "60vh",
        padding: theme.spacing(2),

    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    fieldsContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-around',

        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        width: "50vh",
        // maxHeight: "40vh",
    },
    formContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
        // flexWrap: 'nowrap',
        // padding: theme.spacing(1),

        // width: "100%",
        // height: "100%",
    },
    gridField: {
        margin: theme.spacing(3),
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),

        // width: "50vh",
        // maxHeight: "40vh",
    },
    buttonSubmit: {
        // margin: theme.spacing(3, 0, 2),
        width: "20vh",
    },
    buttonClose: {
        // margin: theme.spacing(3, 0, 2),
        width: "20vh",
    },
    // limit: {
    //     // margin: theme.spacing(3, 0, 2),
    //     color: "#3f51b5",


    // },
    // root: {
    //     color: "#3f51b5",
    // }
}));
