import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    tableContainer: {
        // position: "absolute",
        maxWidth: "90vw",
        margin: theme.spacing("1.5vw", "5vw"),
        borderRadius: "10px",
    },
    tableCellTitle: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 14,
    },
    bottomButtonRegister: {
        margin: theme.spacing(1),
        variant: "contained",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    bottomButtonClose: {
        margin: theme.spacing(1),
        variant: "contained",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    deleteICon: {
        '&:hover': {
            color: theme.palette.error.main,
        },
    },
    settingICon: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
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
}));