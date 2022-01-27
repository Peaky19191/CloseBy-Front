import { Grid } from '@material-ui/core';
import {
    Combobox,
    ComboboxInput, ComboboxOption, ComboboxPopover
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import useStyles from './styles';





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
        <Grid container>

            {/* <TextField label="Search" name="name" htmlFor="name" variant="outlined" type="text" autoFocus > */}
            <Combobox onSelect={async (address) => {
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
                <ComboboxInput className={classes.search} value={value} onChange={(e) => { setValue(e.target.value) }} disabled={!ready} placeholder="Search an adress" />
                <ComboboxPopover>
                    {status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
                </ComboboxPopover>
            </Combobox>
        </Grid >
        // </TextField>
    );
}

export default Search;
