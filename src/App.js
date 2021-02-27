import './App.css';
import React, {useState} from "react";
import {Container, Grid, Paper} from '@material-ui/core'
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchForm from "./components/SearchForm";
import ItemsList from "./components/ItemsList";
import QuoteListItem from "./components/QuoteListItem";
import {QuoteListHeaderCells} from "./enum";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    header: {
        textAlign: 'left',
    },
}));

function App() {

    const classes = useStyles();
    const [items, setItems] = useState([])
    const quotesSearched= (quotesList)=> {
        setItems(quotesList)
    }

    return (
        <div className="App">
            <Container>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h3 className={classes.header}>Search for a quote</h3>
                                <SearchForm quotesSearched={quotesSearched}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ItemsList items={items} ItemComponent={QuoteListItem} headCells={QuoteListHeaderCells} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}

export default App;
