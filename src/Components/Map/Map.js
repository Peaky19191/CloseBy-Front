import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import useStyles from './styles';
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import Search from './Search/Search'
import Compass from './Compass/Compass';
import Events from '../../Api/events';
import { setEventLoc } from "../../Actions/Profiles/events";
import { useDispatch } from "react-redux";
import moment from 'moment'

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

const Map = () => {
    const classes = useStyles();

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        getList();
    });

    const [selected, setSelected] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    const [newSelected, setNewSelected] = React.useState(null);
    const [newMarker, setNewMarker] = React.useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const getList = () => {
        Events.getEventsList(page, rowsPerPage)
            .then((response) => {
                const events = response.data.items;

                events.forEach(function (item, index) {
                    setMarkers((event) => [
                        ...event,
                        {
                            lat: Number(item.localization.latitude),
                            lng: Number(item.localization.longitude),
                            time: Date(item.startDateTime),
                            title: item.title,
                            desc: item.description,
                            company: item.company,
                            personLimit: item.personLimit,
                            type: item.type,

                        }]
                    );
                })
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const dispatch = useDispatch();

    const onMapClick = React.useCallback((event) => {
        setSelected(null);
        setNewSelected(null);
        setNewMarker(current => [
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }]
        );
        dispatch(setEventLoc(event.latLng.lat(), event.latLng.lng()))
    }, []);

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
            <Search panTo={panTo} />
            <Compass panTo={panTo} />

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} options={options} onClick={onMapClick} onLoad={onMapLoad}>
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/logo2.jpg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected ?
                    (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null) }}>
                        <div>
                            <h2>Event</h2>
                            <p>Title:  {selected.title}</p>
                            <p>Desc:  {selected.desc}</p>
                            <p>Start Date {moment(selected.time).format('DD/MM/YYYY HH:mm')}</p>
                            <p>Company:  {selected.company}</p>
                            <p>People Limit:  {selected.personLimit}</p>
                            <p>Type:  {selected.type}</p>
                            <p>LAT:  {selected.lat}</p>
                            <p>LNG:  {selected.lng}</p>
                        </div>
                    </InfoWindow>)
                    : null}
                {newMarker.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `./assets/logo2.jpg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(45, 45),
                            scaledSize: new window.google.maps.Size(90, 90),
                        }}
                        onClick={() => {
                            setNewSelected(marker);
                        }}
                    />
                ))}
                {newSelected ?
                    (<InfoWindow position={{ lat: newSelected.lat, lng: newSelected.lng }} onCloseClick={() => { setNewSelected(null) }}>
                        <div>
                            <h2>Event</h2>
                            <p>LAT:  {newSelected.lat}</p>
                            <p>LNG:  {newSelected.lng}</p>

                        </div>
                    </InfoWindow>)
                    : null}
            </GoogleMap>
        </>
    );
}

export default Map;