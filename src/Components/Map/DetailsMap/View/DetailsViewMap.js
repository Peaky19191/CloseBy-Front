import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, } from "@react-google-maps/api";
import mapStyles from "../../mapStyles";
import useStyles from '../../styles';
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import Search from '../../Search/Search'
import Compass from '../../Compass/Compass';
import Events from '../../../../Services/Profiles/event.service';
import { useDispatch } from "react-redux";
import moment from 'moment'
import { useSelector } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';
import Adress from '../../../../Api/map'
import Event from '../../../../Services/Profiles/event.service'

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vh",
    height: "50vh",
}

const center = {
    lat: 52.2347,
    lng: 21.0042,
}

const MapDetailsView = (props) => {
    const classes = useStyles();

    const { profile: currentProfile } = useSelector((state) => state.auth);
    const { event: currentEventRedux } = useSelector((state) => state);

    const [selected, setSelected] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);


    const [currenEventSelected, setCurrenEventSelected] = React.useState(null);
    const [currentEvent, setCurrentEvent] = React.useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        getList();
        getCurrentEvent();
    });

    const getList = () => {
        Events.getEventsListAll(page, rowsPerPage)
            .then((response) => {
                const events = response.data.items;

                const filteredEvents = events.filter(diffrentThanCurrent)

                filteredEvents.forEach(function (item, index) {
                    Adress.getAdress(item.localization.latitude, item.localization.longitude)
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
    };


    function diffrentThanCurrent(event) {
        return event.id !== currentEventRedux.id_event;
    }

    const getCurrentEvent = () => {
        Event.getEventId(props.currentEventId)
            .then((response) => {
                const curEvent = response.data;

                Adress.getAdress(curEvent.localization.latitude, curEvent.localization.longitude)
                    .then((response) => {
                        const address = response.data.results[0].formatted_address;

                        setCurrentEvent(() => [
                            {
                                lat: Number(curEvent.localization.latitude),
                                lng: Number(curEvent.localization.longitude),
                                address: address,
                                time: curEvent.startDateTime,
                                title: curEvent.title,
                                desc: curEvent.description,
                                company: curEvent.company,
                                personLimit: curEvent.personLimit,
                                type: curEvent.type,
                                status: curEvent.status,
                                id: curEvent.id,
                            }]);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                panTo({ lat: Number(curEvent.localization.latitude), lng: Number(curEvent.localization.longitude) });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onMapClick = React.useCallback((event) => {
        setSelected(null);
        setCurrenEventSelected(null);
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY_2,
        libraries,
    });

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const openCurrentEvent = () => {
        setCurrenEventSelected(true);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loadin Maps";

    return (
        <>
            <Search panTo={panTo} />
            <Compass panTo={panTo} />

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
                            <p>Desc:  {selected.desc}</p>
                            <p>Start Date {moment(selected.time).format('MM/DD/YYYY HH:mm')}</p>
                            {(currentProfile.role === "GlobalAdmin") && <p>Company:  {selected.company}</p>}
                            <p>Tickets Limit:  {selected.personLimit}</p>
                            <p>Type:  {selected.type}</p>
                            <p>Address:  {selected.address}</p>
                            {/* <p>LAT:  {selected.lat}</p>
                            <p>LNG:  {selected.lng}</p> */}
                        </div>
                    </InfoWindow>)}
                {currentEvent.map((marker) => (
                    <Marker

                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/map_yellow.png`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setCurrenEventSelected(marker);
                        }}
                    />
                ))}
                {currenEventSelected &&
                    (<InfoWindow onIdle={openCurrentEvent} position={{ lat: currenEventSelected.lat, lng: currenEventSelected.lng }} onCloseClick={() => { setCurrenEventSelected(null) }}>
                        <div>
                            <h2>Current Event</h2>
                            <p>Title:  {currenEventSelected.title}</p>
                            {/* <p>Desc:  {currenEventSelected.desc}</p> */}
                            <p>Start Date {moment(currenEventSelected.time).format('MM/DD/YYYY HH:mm')}</p>
                            {(currentProfile.role === "GlobalAdmin") && <p>Company:  {currenEventSelected.company}</p>}
                            {/* <p>Tickets Limit:  {currenEventSelected.personLimit}</p>  */}
                            <p>Type:  {currenEventSelected.type}</p>
                            <p>Address:  {currenEventSelected.address}</p>
                            {/* <p>LAT:  {currenEventSelected.lat}</p>
                            <p>LNG:  {currenEventSelected.lng}</p> */}
                        </div>
                    </InfoWindow>)}

            </GoogleMap>
        </>
    );
}

export default MapDetailsView;