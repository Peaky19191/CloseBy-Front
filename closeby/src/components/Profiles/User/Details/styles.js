import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    popupBox: {
        position: "fixed",
        background: '#00000050',
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
    },

    box: {
        position: "relative",
        width: "70%",
        margin: 0,
        height: "auto",
        maxHeight: "70vh",
        marginTop: "15vh",
        marginLeft: "25vh",
        background: '#fff',
        borderRadius: "4px",
        padding: "20px",
        overflow: "auto",
    },

    closeIcon: {
        cursor: "pointer",
        position: "fixed",
        right: "31vh",
        top: "16vh",
        background: '#ededed',
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        lineHeight: "20px",
        textAlign: "center",
        border: "1px",
        fontSize: "20px",
    },
}));