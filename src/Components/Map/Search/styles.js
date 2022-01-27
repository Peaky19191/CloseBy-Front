import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        // position: "relative",
        // position: "fixed",
        // backgroundColor: "#208ac6",

    },
    search: {
        width: '300px',
        height: '30px',
        fontSize: '20px',
        // position: "absolute",
        // position: "fixed",
        // backgroundColor: "#208ac6",
        '&:hover': {
            borderColor: "primary.main",
            // borderColor="primary.main"
        },
    },
}));
