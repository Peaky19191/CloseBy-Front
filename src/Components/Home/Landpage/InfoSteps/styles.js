import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    arrowForward: {
        color: '#CEE4E8',
        fontSize: '7rem',
    },
    goDown: {
        color: '#CEE4E8',
        fontSize: '7rem',
        maxHeight: 100
    },
    container: {
        textAlign: 'center',
    },
}))