import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {frightTypes, Countries} from '../enum.js';

const useStyles = makeStyles((theme) => ({
    input: {
        width: '100%',
    },
    button: {
        float: 'right'
    }
}));

const SearchForm = ({quotesSearched}) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [frightType, setFrightType] = React.useState('all');
    const [originLocation, setOriginLocation] = React.useState({});
    const [destinationLocation, setDestinationLocation] = React.useState({});
    const [errors, setErrors] = useState({})

    const handleFrightTypeChange = (e) => {
        setFrightType(e?.target?.value);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const quoteList = [
        {quote: 'Quote #1', price: 1500, eta: 30, duration: 20, frightType: 'ocean-lcl'},
        {quote: 'Quote #2', price: 1300, eta: 10, duration: 30, frightType: 'ocean-fcl'},
        {quote: 'Quote #3', price: 1000, eta: 34, duration: 15, frightType: 'air'},
        {quote: 'Quote #4', price: 1200, eta: 20, duration: 18, frightType: 'ocean-lcl'},
        {quote: 'Quote #5', price: 2000, eta: 50, duration: 12, frightType: 'air'},
        {quote: 'Quote #6', price: 3000, eta: 20, duration: 14, frightType: 'ocean-fcl'},
        {quote: 'Quote #7', price: 1400, eta: 12, duration: 20, frightType: 'ocean-fcl'},
        {quote: 'Quote #8', price: 1200, eta: 15, duration: 25, frightType: 'ocean-lcl'},
        {quote: 'Quote #9', price: 1800, eta: 30, duration: 6, frightType: 'air'},
    ];
    const handleOriginUpdate = (e, value) => {
        if (value && value !== originLocation) {
            setOriginLocation(value)
        }
    }
    const handleDestinationLocationUpdate = (e, value) => {
        if (value && value !== originLocation) {
            setDestinationLocation(value)
        }
    }
    const searchClicked = () => {
        let formErrors = {}
        if (!originLocation?.name) {
            formErrors.originLocation = "Origin is required"
        }
        if (!destinationLocation?.name) {
            formErrors.destinationLocation = "Destination is required"
        }
        setErrors(formErrors);
        if (!Object.keys(formErrors)?.length) {
         quotesSearched(quoteList)
        }
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Autocomplete
                        id="origin"
                        getOptionLabel={(option) => option.name}
                        options={Countries}
                        onChange={handleOriginUpdate}
                        renderInput={(params) => <TextField{...params} error={!!errors.destinationLocation} helperText={errors.destinationLocation} label="Origin" margin="normal"/>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        id="destination"
                        getOptionLabel={(option) => option.name}
                        options={Countries}
                        onChange={handleDestinationLocationUpdate}
                        renderInput={(params) => <TextField{...params} error={!!errors.originLocation} helperText={errors.originLocation} label="Destination" margin="normal"/>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="fright-type"
                        select
                        label="Freight Type"
                        value={frightType}
                        className={classes.input}
                        onChange={handleFrightTypeChange}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {frightTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.input}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="none"
                            id="date-picker-inline"
                            label="Pick up date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Icon>search</Icon>}
                        onClick={searchClicked}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

        </form>

    );
}

export default SearchForm;