import React, { useState, useEffect } from "react";
import Company from '../../../api/company'
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const CompanyList = () => {
    const classes = useStyles();
    const [company, setCompany] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);


    const getList = () => {
        Company.getCompanyList(page, rowsPerPage)
            .then((response) => {
                const companysTemp = response.data.items;
                const totalPages = response.data.count;

                setCompany(companysTemp);
                setCount(totalPages);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(getList, [page, rowsPerPage]);

    const deleteFromList = async (id) => {
        await Company.deleteCompany(id);
        getList();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <TableContainer className={classes.tableContainer} component={Paper} elevation={3} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.tableCellTitle}>Company Name</TableCell>
                        <TableCell align="center" className={classes.tableCellTitle}>Created At</TableCell>
                        <TableCell align="center" className={classes.tableCellTitle}>Actions</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {company.map((item) => (
                        <TableRow key={item.id} >
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="center">{item.createdAt}</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon onClick={() => {
                                        deleteFromList(item.id, item.company.id)
                                    }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default CompanyList;