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

// ---

const sample = [
    ["ec2-12213-23232", "12-2-21", "North-America", 0, "Offline"],
    ["definitelyNotInfected", "22-3-15", "Your-Home-PC", 37, "Normal"],
    ["CryptoMiner", "30-2-12", "West-Europe", 2, "Critical"],
    ["KGBHideout", "6-9-76", "Washington-DC", 13, "Remediated"],
    ['the"Dark"Web', "2-3-04", "Sweden", 666, "Requires Attention"],
];

function createData(id, alertID, dateCreated, location, alertType, logStatus) {
    return { id, alertID, dateCreated, location, alertType, logStatus };
}

const rows = [];

for (let i = 0; i < 20; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}


class ReactVirtualizedTable extends Component{
    constructor(props){
        super(props);
        this.state = {logData : "test"};
        this.requestLog = this.requestLog.bind(this);
        this.requestLog();
        // console.log("Constructor");
        // console.log(this.state);
    }


    requestLog() {
        fetch('http://localhost:1337/log')
            .then(async response => {
                const data = await response.json();
                this.setState({
                    logData : data
                })
                // console.log("log");
                // console.log(data);
            })
    }

    render(){
        return (
            <Paper style={{ height: 200, width: "100%" }}>
                <Button onClick={this.requestLog}>Get</Button>

                <VirtualizedTable
                    rowCount={rows.length}
                    rowGetter={({ index }) => rows[index]}
                    columns={[
                        {
                            width: 150,
                            label: "ID",
                            dataKey: "alertID",
                        },
                        {
                            width: 80,
                            label: "Creation",
                            dataKey: "dateCreated",
                        },
                        {
                            width: 120,
                            label: "Region",
                            dataKey: "location",
                        },
                        {
                            width: 120,
                            label: "Alert",
                            dataKey: "alertType",
                            numeric: true,
                        },
                        {
                            width: 170,
                            label: "Status",
                            dataKey: "logStatus",
                        },
                    ]}
                />
            </Paper>
        );
    }
}

export default ReactVirtualizedTable;