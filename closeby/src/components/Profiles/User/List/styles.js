import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tableContainer: {
        position: "absolute",
        maxWidth: "95vw",
        marginTop: "3vh",
        marginBottom: "3vh",
        marginLeft: "5vh",
        borderRadius: "10px",
    },
    tableCellTitle: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 14,
    },
}));