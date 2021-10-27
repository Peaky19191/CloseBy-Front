import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tableContainer: {
        position: "absolute",
        maxWidth: "90vw",
        margin: theme.spacing("1.5vw", "5vw"),
        borderRadius: "10px",
    },
    tableCellTitle: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 14,
    },
}));