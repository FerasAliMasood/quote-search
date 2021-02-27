import React, {useEffect, useState} from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core";
import QuoteListItem from "./QuoteListItem";
import {frightTypes} from "../enum";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({classes, headCells, order, orderBy, filterChosen, onRequestSort}) {
    const [filterValue, setFilterValue] = useState(null)
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const handleFilterChange=(e) => {
        if (e?.target?.value && e.target.value != filterValue) {
            setFilterValue(e.target.value)
            filterChosen(e.target.name, e.target.value)
        }
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.isSortable !== false ? (<TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>) : (headCell.isFilter) ? (
                            <TextField
                            id="tableFilter"
                            select
                            value={filterValue || 'all'}
                            label={headCell.label}
                            name={headCell.id}
                            style={{width: '100%'}}
                            onChange={handleFilterChange}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {headCell.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>) : headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const ItemsList = ({items, ItemComponent, headCells}) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [viewableItems, setViewableItems] = React.useState([]);
    const [filterBy, setFilterBy] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    useEffect(()=>{
        if (filterValue && filterBy && filterValue !== 'all') {
            setViewableItems([...items.filter((item)=>item[filterBy] === filterValue)])

        } else {
            setViewableItems([...items]);
        }
    },[items, filterValue, filterBy])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleFilter = (id, value)=> {
        setFilterValue(value);
        setFilterBy(id);
    }
    return (
        <div>
            {items?.length > 0 ? (<TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        filterChosen={handleFilter}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={items.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {viewableItems?.length > 0 ? stableSort(viewableItems, getComparator(order, orderBy))
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <ItemComponent key={labelId} row={row}/>
                                );
                            }) : (<TableRow><TableCell colSpan={headCells.length}>No items to show</TableCell></TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>) : (<h6>No items to show</h6>)}
        </div>
    );
}
export default ItemsList;