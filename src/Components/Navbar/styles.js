import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    list: {
        padding: '0'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuContainer: {
        margin: theme.spacing(1, 2, 0, 0),
    },
    logo: {
        width: '100px',
        height: '100px',
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.primary.main,
    },
    icon: {
        color: '#A8E0EE',
        width: '36px',
        height: '48px',
    },
    logout: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    main: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));
