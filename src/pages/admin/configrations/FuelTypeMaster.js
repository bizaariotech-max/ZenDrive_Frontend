import React, { useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { IconButton, Menu, MenuItem, } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'

const RowActions = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-controls={open ? "actions-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ color: "gray" }} />
            </IconButton>

            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {

                        borderRadius: "12px",
                        boxShadow:
                            "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        alert(`Edit button clicked ${row?._id}`);
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        alert(`Delete button clicked ${row?._id}`);
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};
const FuelTypeMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [fuelTypeMaster, setFuelTypeMaster] = useState("");
    const columns = [
        {
            field: "_id", headerName: "ID", width: 90, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?._id || "N/A"}</span>,
            // renderCell: (params) => {
            //     const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
            //     return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            // },
        },
        {
            field: "LookupTitle",
            headerName: "Role Master",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.LookupTitle || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            width: 150,
            headerClassName: "blue-header",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <RowActions row={params.row} />,
        }
    ];

    const rows = [
        { _id: '1', LookupTitle: 'Petrol' },
        { _id: '2', LookupTitle: 'Diesel' },
        { _id: '3', LookupTitle: 'Electric' },
        { _id: '4', LookupTitle: 'LPG' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form Submitted:" + fuelTypeMaster);
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Fuel Type Master"
                description="Add or update the required details for the fuel type master to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Fuel type master"
                        name="fuelTypeMaster"
                        placeholder="Enter Fuel type master"
                        value={fuelTypeMaster}
                        onChange={(e) => setFuelTypeMaster(e.target.value)}
                    />

                </div>

                <div className="mt-4">
                    <FormButton>Add Fuel</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    sx={{
                        // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        border: "none",
                        color: "var(--text-secondary)",
                        fontFamily: "Roboto, sans-serif",

                        "& .blue-header": {
                            backgroundColor: "var(--accent)",
                            color: "var(--sidebar-accent-foreground)",
                        },
                        "& .blue-header .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: 600,
                        },
                    }}
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>

        </div>
    )
}

export default FuelTypeMaster