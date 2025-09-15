import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import { DataGrid } from '@mui/x-data-grid'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import { Popup } from '../../../components/common/Popup';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { TextField } from '@mui/material'
import axios from 'axios'

const AbnormalityMaster = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dataList, setDataList] = useState({
        investigationList: [],
        abnormalityList: [],
    });
    const [formData, setFormData] = useState({
        investigationId: '',
        abnormality: '',
        abnormalityImage: null,
        measuementUnit: '',
        measuementType: '',
    });
    const [editId, setEditId] = useState(null);
    const { investigationList, abnormalityList } = dataList;
    ///========== columns for datagrid table list ============\\
    const columns = [
        {
            field: "_id", headerName: "Sr. No", width: 90, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "parent_lookup_name",
            headerName: "Investigation Master",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "Abnormality Master",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "measurement_unit",
            headerName: "Measurement Unit",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.other?.measurement_unit || "N/A"}</span>,
        },
        {
            field: "measurement_type",
            headerName: "Measurement Type",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.other?.measurement_type || "N/A"}</span>,
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }
    ];

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    //========== handle form input change ============\\
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData?.abnormality?.trim() && formData?.abnormality?.length === 0) {
            toast.error("Please enter a valid Abnormality Master");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": formData?.abnormality,
                "lookup_type": "abnormality",
                "parent_lookup_type": "investigation_type",
                "parent_lookup_id": formData?.investigationId || null,
                "other": {
                    "abnormality_image": formData?.abnormalityImage || null,
                    "measurement_unit": formData?.measuementUnit || "",
                    "measurement_type": formData?.measuementType || "",
                }
            }
            console.log("Payload for submission:", payload);
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Abnormality Master updated successfully" : "Abnormality Master added successfully");
                setFormData({
                    investigationId: '',
                    abnormality: '',
                    abnormalityImage: null,
                    measuementUnit: '',
                    measuementType: '',
                });
                setEditId(null);
                setIsLoading(false);
                fetchData(['abnormality'], "abnormalityList");
            } else {
                toast.error(res.response.response_message || "Failed to add Abnormality Master");
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

            if (data && Array.isArray(data) && data.length > 0) {
                updateState({ [stateKey]: data, });
            }
            else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                updateState({ [stateKey]: data.data, });
            } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
                updateState({ [stateKey]: data.list, });
            }
            else {
                // console.warn(`No data found for ${stateKey}:`, data);
                updateState({ [stateKey]: [], });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['investigation_type'], "investigationList");
        fetchData(['abnormality'], "abnormalityList");
    }, []);

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        setFormData({
            vehicleModel: row?.lookup_value || '',
            manufactureId: row?.parent_lookup_id || '',
        })
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {
                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Abnormality Master deleted successfully");
                    fetchData(['abnormality'], "abnormalityList");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    //=======function to upload the file to the server when i change the file========\\
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/v1/common/AddImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response?.data && response?.data?.response?.response_code === "200") {
                setFormData((prev) => ({
                    ...prev,
                    abnormalityImage: response.data?.data[0]?.full_URL || "",
                }));
            }
            else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
            return response.data;
        } catch (error) {
            console.error("File upload failed:", error);
            throw error;
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Abnormality Master"
                description="Add or update the required details for the abonormality master to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Select Investigation Type"
                        name="investigationId"
                        placeholder="Select Investigation Type"
                        type="select"
                        value={formData?.investigationId}
                        onChange={handleChange}
                        options={investigationList}
                    />

                    <FormInput
                        label="Abnormality"
                        name="abnormality"
                        placeholder="Enter Abnormality"
                        value={formData?.abnormality}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor={"abnormalityImage"} className="text-base font-semibold">
                            Abnormality Image
                        </label>
                        <TextField
                            fullWidth
                            id={"abnormalityImage"}
                            name={"abnormalityImage"}
                            placeholder={"Upload Abnormality Image"}
                            variant="outlined"
                            size="small"
                            className="custom-input"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={handleFileUpload}
                        />
                    </div>
                    <FormInput
                        label="Measurement Unit"
                        name="measuementUnit"
                        type='number'
                        placeholder="Enter Measurement Unit"
                        value={formData?.measuementUnit}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Measurement Type"
                        name="measuementType"
                        placeholder="Enter Measurement Type"
                        value={formData?.measuementType}
                        onChange={handleChange}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>{isLoading ? editId ? "Updating..." : "Adding..." : editId ? "Update Abnormality" : "Add Abnormality"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={abnormalityList}
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

export default AbnormalityMaster