import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        flexDirection: 'row',
        backgroundColor: 'rgb(0, 0, 0)',
    },
    toolbar: {
        width: '100%',
        justifyContent: "flex-end",
    },
    button: {
        margin: theme.spacing(1),
    },
}));
