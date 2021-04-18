import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
// import { TIMEOUT } from 'node:dns';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from "@material-ui/core/IconButton";

const columns = [
  
  { id: 'alertID', label: 'ID', minWidth: 50 },
  { id: 'resource', label: 'Resource', minWidth: 100 },
  {
    id: 'region',
    label: 'Region',
    minWidth: 120,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'alert',
    label: 'Alert',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 150,
    // align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'save',
    label: '',
    minWidth: 50,
    align: 'right',
  },
];

function createData(id, alertID, resource, region, alert, status, save) {
  return { id, alertID, resource, region, alert, status, save};
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const cellColors = {
  "true": "blue",
  "false": "red",
  Critical: "#F04242",
  "Requires Attention": "#FAB15C",
  Offline: "#D9D9D9",
  Normal: "white",
  Remediated: "white",
};

const StyledTableCell = makeStyles((isrem)=>({
  body: {
    fontSize: 14,
    // backgroundColor: cellColors[isRem],
    backgroundColor: "black",
    color: "black",
  },
}))(TableCell);



export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [logData, setLogData] = React.useState([]);
  const [refresh, setRefresh] = React.useState([false]);

  function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const handleLogRequest = (id) =>{
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "logId": id }),
    };

    const response = fetch('http://localhost:1337/api/log', requestOptions)
      .then((res)=> res.json())
      .then((res)=> downloadObjectAsJson(res, "file"));
    // console.log(response);
    return response;
  }


  const saveButton = (id) =>{
    // console.log("ID: ", id);
    return(
      <IconButton onClick={() => { handleLogRequest(id)}} color="inherit" size="small">
        <SaveAltIcon />
      </IconButton>
    );
  }

  const testVal = "save";


  const extract = (data) =>{
    console.log(data);
    let temp = [];
    let mrows = [];
    for(let i=0; i < data.length; i++){
        temp.push(data[i].id);
        temp.push(data[i].alert.resource.resourceType);
        temp.push(data[i].alert.region);
        temp.push(data[i].alert.type);
        temp.push("Normal");
        temp.push(testVal);
        temp.push(data[i].isRemediated);
        mrows.push(createData(i, ...temp));
        temp = [];
    }
    // console.log(mrows);
    return mrows;
  };
  
  React.useEffect( async () => {
    const response = fetch('http://localhost:1337/log')
      .then((res)=> res.json())
      .then((res)=>{
        setLogData(extract(res))
      })
  }, [refresh]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const refreshHandler = () =>{
    setRefresh(!refresh);
    // console.log("in refresh hdanler");
  };

  return (
    <Paper className={classes.root}>
      <Button onClick={refreshHandler}>Reload</Button>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((logData) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={logData.code}>
                  {columns.map((column) => {
                    const value = logData[column.id];
                    if(value == "save"){
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : saveButton(logData.alertID)}
                        </TableCell>  
                      )
                    }
                    else{
                      if(column.id == "status"){
                        return (
                          <StyledTableCell isrem={logData.isRemediated} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </StyledTableCell >
                        );
                      }
                      else{
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell >
                        );
                      }

                      
                    }
                  })}

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, { label: 'All', value: -1 }]}
        component="div"
        count={logData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}