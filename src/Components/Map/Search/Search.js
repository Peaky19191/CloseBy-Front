import React from "react";

import useStyles from './styles';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import IconButton from '@material-ui/core/IconButton';

import "@reach/combobox/styles.css";

import { Avatar, Button, Paper, Grid, Typography, Container, Select, TextField } from '@material-ui/core';


const Search = (props) => {
    const classes = useStyles();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    return (
        <div className={classes.searchContainer} >

            {/* <TextField label="Search" name="name" htmlFor="name" variant="outlined" type="text" autoFocus > */}
            <Combobox className={classes.search} onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();

                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);

                    props.panTo({ lat, lng });

                } catch (error) {
                    console.log(error)
                }
            }}>
                <ComboboxInput value={value} onChange={(e) => { setValue(e.target.value) }} disabled={!ready} placeholder="Enter an adress" />
                <ComboboxPopover>
                    {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
                </ComboboxPopover>
            </Combobox>
        </div>
        // </TextField>
    );
}

export default Search;
