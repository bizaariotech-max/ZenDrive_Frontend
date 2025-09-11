// src/pages/admin/configrations/ManufactureMaster.js
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { DataGrid } from '@mui/x-data-grid'
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormButton from '../../../components/common/FormButton'
import FormInput from '../../../components/common/FormInput'
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { toast } from 'react-toastify';
import { __postApiData } from '../../../utils/api';
import { Popup } from '../../../components/common/Popup';


const RowActions = ({ row, onEdit, onDelete }) => {
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
                        if (onEdit) onEdit(row);
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        if (onDelete) onDelete(row);
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

const ManufactureMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [manufactureMaster, setManufactureMaster] = useState("");
    const [menufatuctureMasterList, setManufactureMasterList] = useState([]);
    const [editId, setEditId] = useState(null);
    //====== Define columns for DataGrid table list ======\\
    const columns = [
        {
            field: "_id", headerName: "ID", width: 90, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <span>{params.row?._id || "N/A"}</span>,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "lookup_value",
            headerName: "Manufacture Master",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
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
            renderCell: (params) => <RowActions row={params.row} onEdit={() => handleEdit(params.row)}   // ✅ Pass handler
                onDelete={() => handleDelete(params.row)} />,
        }
    ];

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!manufactureMaster.trim() && manufactureMaster.length === 0) {
            toast.error("Please enter a valid Manufacture Master");
            return;
        }
        setIsLoading(true);

        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": manufactureMaster,
                "lookup_type": "manufacturer_type",
                "parent_lookup_type": "",
                "parent_lookup_id": null
            }
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Manufacture Master updated successfully" : "Manufacture Master added successfully");
                setManufactureMaster("");
                setEditId(null);
                setIsLoading(false);
                fetchData(['manufacturer_type'],);
            } else {
                toast.error(res.response.response_message || "Failed to add Manufacture Master");
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting form:", error);
        }

    };

    ///========== fetch data from api ============\\

    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setManufactureMasterList(data);
        } catch (error) {
            console.error(`Error fetching:`, error);
        }
    }

    useEffect(() => {
        fetchData(['manufacturer_type'],);
    }, []);

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setManufactureMaster(row.lookup_value);
        setEditId(row._id);
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Manufacture Master deleted successfully");
                    fetchData(['manufacturer_type']);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Manufacture Master"
                description="Add or update the required details for the manufacture master to keep records accurate and complete."
            />
            <form className='flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput
                        label="Manufacture master"
                        name='manufactureMaster'
                        placeholder="Enter manufacture master"
                        value={manufactureMaster}
                        onChange={(e) => setManufactureMaster(e.target.value)}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disabled={isLoading}>{isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Manufacture" : "Add Manufacture"}</FormButton>
                </div>
            </form>

            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={menufatuctureMasterList}
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

export default ManufactureMaster