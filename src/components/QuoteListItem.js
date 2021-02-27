import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {frightTypes} from '../enum.js';
const useStyles = makeStyles((theme) => ({

    tableRow: {
        borderRadius: '10px',
        background: '#F5F6FA',
        '&:nth-child(even)': {
            background: '#fff',
        },
    },
    tableCell: {
        borderBottom: 0,
        padding: '15px',
        fontFamily: 'Poppins, sans-serif',
    },
    tableSeparator: {
        height: '20px',
    },
}));
const QuoteListItem = ({row}) => {
    const classes = useStyles();
    const frightType = frightTypes.find((type)=>type.value === row.frightType);
    return (
        <React.Fragment>
            <TableRow className={classes.tableRow}>
                <TableCell  
                           className={classes.tableCell}
                           style={
                               {
                                   borderTopLeftRadius: '10px',
                                   borderBottomLeftRadius: '10px',
                               }}>
                    <input name="selectedQuote" value={row.quote} type={'radio'}/>
                    {row.quote}
                </TableCell>
                <TableCell   className={classes.tableCell}>
                    {row.price}
                </TableCell>
                <TableCell   className={classes.tableCell}>
                    {row.duration}
                </TableCell>
                <TableCell   className={classes.tableCell}>
                    {row.eta}
                </TableCell>
                <TableCell  
                           className={classes.tableCell}
                           style={
                               {
                                   borderTopRightRadius: '10px',
                                   borderBottomRightRadius: '10px',
                               }}
                >
                    {frightType?.label || '-'}
                </TableCell>
            </TableRow>
            <TableRow className={classes.tableSeparator}>

            </TableRow>
        </React.Fragment>
    );
}
export default QuoteListItem;