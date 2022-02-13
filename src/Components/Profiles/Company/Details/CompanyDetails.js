import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { editCompany } from "../../../../Actions/Profiles/company";
import { getCompAdminListDispatch } from '../../../../Actions/Profiles/companyAdmin';
import { getCompWorkerListDispatch } from '../../../../Actions/Profiles/companyWorker';
import { getEventListAllDispatch } from '../../../../Actions/Profiles/events';
import Message from '../../../Message/Message';
import useStyles from './styles';

const CompanyDetails = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const company = useSelector(state => state.company.company);

    const [eventsListLoaded, setEventListLoaded] = useState(false);
    const [eventsList, setEventList] = useState([]);

    const [compWorkersListLoaded, setCompWorkersListLoaded] = useState(false);
    const [compWorkersList, setCompWorkersList] = useState([]);

    const [compAdminsListLoaded, setCompAdminsListLoaded] = useState(false);
    const [compAdminsList, setCompAdminsList] = useState([]);
    // eslint-disable-next-line
    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [name, setName] = useState(company.name);

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const [disaled, setDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const startEditing = () => {
        setDisabled(false);
        setEditMode(true);
    }

    const stopEditing = () => {
        setDisabled(true);
        setEditMode(false);
    }

    const selectCompanyWorkersList = () => {
        dispatch(getCompWorkerListDispatch(page, rowsPerPage, company.id))
            .then((response) => {
                const compWorkersList = response.data.items;

                setCompWorkersList(compWorkersList);
                setCompWorkersListLoaded(true)
            })
            .catch((e) => {
                console.log(e);
            });
    }
    // useEffect(selectCompanyWorkersList, [company.id]);// eslint-disable-line react-hooks/exhaustive-deps


    const selectCompanyAdminsList = () => {
        dispatch(getCompAdminListDispatch(page, rowsPerPage, company.id))
            .then((response) => {
                const compAdminsList = response.data.items;

                setCompAdminsList(compAdminsList);
                setCompAdminsListLoaded(true)
            })
            .catch((e) => {
                console.log(e);
            });
    }
    // useEffect(selectCompanyAdminsList, [company.id]);// eslint-disable-line react-hooks/exhaustive-deps


    const selectEventsList = () => {
        dispatch(getEventListAllDispatch(page, rowsPerPage, company.id))
            .then((response) => {
                const eventsList = response.data.items;

                setEventList(eventsList);
                setEventListLoaded(true)
            })
            .catch((e) => {
                console.log(e);
            });
    }
    // useEffect(selectEventsList, [company.id]);// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        selectCompanyWorkersList();
        selectCompanyAdminsList();
        selectEventsList();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const [loadMessage, setLoadMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadMessage(false);

        if (validate()) {
            setLoading(true);
            dispatch(editCompany(company.id, name))
                .then(() => {
                    setLoadMessage(true);
                    setLoading(false);
                })
                .catch(() => {
                    setLoadMessage(true);
                    setLoading(false);
                });
        }
    };
    // eslint-disable-next-line
    const [errors, setErrors] = useState({});
    const enabled = name.length > 0;

    let history = useHistory();

    const goToPreviousPath = () => {
        history.goBack()
    }

    const validate = () => {
        let temp = {}
        temp.name = (/^[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/).test(name) ? "" : "Whitespaces are not allowed"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    return (
        <>
            {((eventsListLoaded && compWorkersListLoaded && compAdminsListLoaded) !== true) ?
                <Grid className={classes.spinnerContainer}>
                    <CircularProgress size={500} thickness={1} />
                </Grid>
                :
                <Container className={classes.container} component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <SupervisorAccountIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Details of the Company</Typography>
                        {loadMessage &&
                            <Message />
                        }
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField value={name} label="Company Name" onChange={onChangeName} InputProps={{ readOnly: disaled }} name="name" htmlFor="name" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField value={company.createdAt} label="Created Date" InputProps={{ readOnly: true, disabled: editMode }} name="date" htmlFor="date" variant="outlined" fullWidth />
                                </Grid>
                            </Grid>
                            <Grid className={classes.buttonsContainer} spacing={2}>
                                <Button disabled={(eventsList.length === 0) ? true : false} className={classes.buttonLink} component={Link} to="/eventListCompanyFilter" fullWidth variant="contained" color="primary" >
                                    {(eventsList.length !== 0) ? "Events" : "No Event"}
                                </Button>
                                <Button disabled={(compAdminsList.length === 0) ? true : false} className={classes.buttonLink} component={Link} to="/adminListCompanyFilter" fullWidth variant="contained" color="primary" >
                                    {(compAdminsList.length !== 0) ? "Admins" : "No Admin"}
                                </Button>
                                <Button disabled={(compWorkersList.length === 0) ? true : false} className={classes.buttonLink} component={Link} to="/workerListCompanyFilter" fullWidth variant="contained" color="primary" >
                                    {(compWorkersList.length !== 0) ? "Workers" : "No Worker"}
                                </Button>
                                {editMode ?
                                    <>
                                        <Button disabled={!enabled} type="submit" className={classes.buttonEditSave} fullWidth variant="contained"  >
                                            {loading ? (
                                                <CircularProgress size="20px" />
                                            ) : "Save"}
                                        </Button>
                                        <Button className={classes.buttonEditStop} onClick={() => { stopEditing() }} fullWidth variant="contained" color="primary" >
                                            Stop Editinig
                                        </Button>
                                    </>
                                    :
                                    <Button className={classes.buttonEditStart} onClick={() => { startEditing() }} fullWidth variant="contained" color="primary" >
                                        Edit
                                    </Button>
                                }
                                <Button className={classes.buttonClose} onClick={goToPreviousPath} fullWidth variant="contained" color="secondary" >
                                    back
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            }
        </>

    );
};

export default CompanyDetails;


