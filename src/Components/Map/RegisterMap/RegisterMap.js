import { Grid } from '@material-ui/core';
import "@reach/combobox/styles.css";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import moment from 'moment';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdressDispatch } from '../../../Actions/Map/map';
import { getCompAdminIdDispatch } from "../../../Actions/Profiles/companyAdmin";
import { getCompWorkerIdDispatch } from "../../../Actions/Profiles/companyWorker";
import { getEventListAllDispatch, setNewEventLoc } from "../../../Actions/Profiles/events";
import Compass from '../Compass/Compass';
import mapStyles from "../mapStyles";
import Search from '../Search/Search';
import useStyles from '../styles';

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vh",
    height: "61vh",
}

const center = {
    lat: 52.2347,
    lng: 21.0042,
}

const MapRegister = () => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);

    const mapRef = React.useRef();
    // eslint-disable-next-line
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        getList();
    });

    const [selected, setSelected] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    const [newSelected, setNewSelected] = React.useState(null);
    const [newMarker, setNewMarker] = React.useState([]);
    // eslint-disable-next-line
    const [page, setPage] = useState(0);
    // eslint-disable-next-line
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const getList = () => {
        if (currentProfile.role === "GlobalAdmin") {
            getEventListId();
        }
        if (currentProfile.role === "CompanyAdmin") {
            dispatch(getCompAdminIdDispatch(currentProfile.id))
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        if (currentProfile.role === "CompanyWorker") {
            dispatch(getCompWorkerIdDispatch(currentProfile.id))
                .then((response) => {
                    const compId = response.data.company.id;

                    getEventListId(compId);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const getEventListId = (companyId) => {
        dispatch(getEventListAllDispatch(page, rowsPerPage, companyId))
            .then((response) => {
                const events = response.data.items;

                events.forEach(function (item, index) {
                    dispatch(getAdressDispatch(item.localization.latitude, item.localization.longitude))
                        .then((response) => {
                            const address = response.data.results[0].formatted_address;

                            setMarkers((event) => [
                                ...event,
                                {
                                    lat: Number(item.localization.latitude),
                                    lng: Number(item.localization.longitude),
                                    address: address,
                                    time: item.startDateTime,
                                    title: item.title,
                                    desc: item.description,
                                    company: item.company,
                                    personLimit: item.personLimit,
                                    type: item.type,
                                    status: item.status,
                                    id: item.id,
                                }]);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const dispatch = useDispatch();

    const onMapClick = React.useCallback((event) => {
        setSelected(null);
        setNewSelected(null);
        dispatch(getAdressDispatch(event.latLng.lat(), event.latLng.lng()))
            .then((response) => {
                const address = response.data.results[0].formatted_address;

                setNewMarker(current => [
                    {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        address: address,
                        // time: new Date(),
                    }]);
            })
            .catch((e) => {
                console.log(e);
            });

        dispatch(setNewEventLoc(event.latLng.lat(), event.latLng.lng()))
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_2,
        libraries,
    });

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loadin Maps";

    return (
        <>
            <Grid className={classes.gridTop} >
                <Search panTo={panTo} />
                <Compass panTo={panTo} />
            </Grid>

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} options={options} onClick={onMapClick} onLoad={onMapLoad}>
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/map.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected &&
                    (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null) }}>
                        <div>
                            <h2>Event</h2>
                            <p>Title:  {selected.title}</p>
                            {/* <p>Desc:  {selected.desc}</p> */}
                            <p>Start Date {moment(selected.time).format('MM/DD/YYYY HH:mm')}</p>
                            {(currentProfile.role === "GlobalAdmin") && <p>Company:  {selected.company}</p>}
                            {/* <p>Tickets Limit:  {selected.personLimit}</p>  */}
                            <p>Type:  {selected.type}</p>
                            <p>Address:  {selected.address}</p>
                            {/* <p>LAT:  {selected.lat}</p>
                            <p>LNG:  {selected.lng}</p> */}
                        </div>
                    </InfoWindow>)}
                {newMarker.map((marker) => (
                    <Marker
                        // key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/map_green.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setNewSelected(marker);
                        }}
                    />
                ))}
                {newSelected &&
                    (<InfoWindow position={{ lat: newSelected.lat, lng: newSelected.lng }} onCloseClick={() => { setNewSelected(null) }}>
                        <div>
                            <h2>Current Event</h2>
                            <p>{newSelected.address}</p>
                            {/* <p>LAT:  {newSelected.lat}</p>
                            <p>LNG:  {newSelected.lng}</p> */}

                        </div>
                    </InfoWindow>)}
            </GoogleMap>
        </>
    );
}

export default MapRegister;