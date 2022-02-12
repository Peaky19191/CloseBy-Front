import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendContactMessageDispatch } from "../../Actions/contact";
import Message from '..//Message/Message';
import useStyles from './styles';

const ContactForm = () => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const [errors, setErrors] = useState({});

    const enabled =
        email.length > 0 &&
        content.length > 0;

    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
    }
    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(false);

        if (validate()) {
            setLoading(true);
            dispatch(sendContactMessageDispatch(email, content))
                .then(() => {
                    setShowMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setShowMessage(true);
                    setLoading(false);
                });
        }
    };

    const validate = () => {
        let temp = {}
        temp.email = (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid"
        temp.content = content ? "" : "This field is required"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Contact us!</Typography>
                {showMessage &&
                    <Message />
                }
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="Email" error={errors.email} helperText={(errors.email)} name="email" htmlFor="email" variant="outlined" type="email" value={email} onChange={onChangeEmail} fullWidth autoFocus />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField multiline label="Message" rows={6} error={errors.content} helperText={(errors.content)} name="content" htmlFor="content" variant="outlined" type="text" value={content} onChange={onChangeContent} fullWidth autoFocus />
                        </Grid>
                    </Grid>
                    <Button type="submit" disabled={!enabled} fullWidth variant="contained" color="primary" className={classes.submit}>
                        {loading ? (
                            <CircularProgress size="20px" />
                        ) : "Send message"}
                    </Button>
                    <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                        Back
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ContactForm;
