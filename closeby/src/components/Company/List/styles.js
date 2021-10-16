import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tableContainer: {
        maxWidth: "99%",
        margin: theme.spacing(0, 0, 0, 1),
    },
    tableCellTitle: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
    },
}));