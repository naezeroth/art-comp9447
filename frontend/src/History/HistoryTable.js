import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import Button from "@material-ui/core/Button";

const cellColors = {
    Critical: "#F04242",
    "Requires Attention": "#FAB15C",
    Offline: "#D9D9D9",
    Normal: "white",
    Remediated: "white",
};

const styles = (theme) => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        "& .ReactVirtualized__Table__headerRow": {
            flip: false,
            paddingRight:
                theme.direction === "rtl" ? "0 !important" : undefined,
        },
    },
    tableRow: {
        cursor: "pointer",
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
        backgroundColor: "white",
    },
    noClick: {
        cursor: "initial",
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 40,
        rowHeight: 30,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        // console.log(cellData);
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{
                    height: rowHeight,
                    backgroundColor: cellColors[cellData],
                }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) ||
                    false
                        ? "right"
                        : "left"
                }
            >
            {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight, backgroundColor: "#F1FAFF" }}
                // align={"left"}
                align={columns[columnIndex].numeric || false ? "right" : "left"}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {

        const {
            classes,
            columns,
            rowHeight,
            headerHeight,
            ...tableProps
        } = this.props;
        // console.log("test------");
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: "inherit",
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


class ReactVirtualizedTable extends Component{
    constructor(props){
        super(props);
        this.state = {logData : "test"};
        this.requestLog = this.requestLog.bind(this);
        this.requestLog();
        // console.log("Constructor");
        // console.log(this.state);
    }

    createData(id, alertID, resourceType, location, alertType, logStatus) {
        return { id, alertID, resourceType, location, alertType, logStatus };
    }

    async requestLog() { 

        const response = await fetch('http://localhost:1337/log');
        const data = await response.json();
        this.setState({
            logData : this.extract(data),
        })
        // console.log("log");
        // console.log(data);
    }


    extract(data){
        // console.log(data);
        let temp = [];
        let mrows = [];
        for(let i=0; i < data.length; i++){
            temp.push(data[i].alert.id);
            temp.push(data[i].alert.resource.resourceType);
            temp.push(data[i].alert.region);
            temp.push(data[i].alert.type);
            temp.push("Normal");
            mrows.push(this.createData(i, ...temp));
            temp = [];
        }
        console.log(mrows);
        return mrows;
    };

    render(){
        return (
            <Paper style={{ height: 600, width: "100%" }}>
                <Button onClick={this.requestLog}>Reload</Button>

                <VirtualizedTable
                    rowCount={this.state.logData.length}
                    rowGetter={({ index }) => this.state.logData[index]}
                    columns={[
                        {
                            width: 350,
                            label: "ID",
                            dataKey: "alertID",
                            numeric: false,
                        },
                        {
                            width: 80,
                            label: "Resource",
                            dataKey: "resourceType",
                            numeric: false,
                        },
                        {
                            width: 120,
                            label: "Region",
                            dataKey: "location",
                            numeric: false,
                        },
                        {
                            width: 300,
                            label: "Alert",
                            dataKey: "alertType",
                            numeric: false,
                        },
                        {
                            width: 170,
                            label: "Status",
                            dataKey: "logStatus",
                            numeric: false,
                        },
                    ]}
                />
            </Paper>
        );
    }
}

export default ReactVirtualizedTable;