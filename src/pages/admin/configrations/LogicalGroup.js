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

const LogicalGroup = () => {
    const [selectedRiskLevel, setSelectedRiskLevel] = useState("68cb9d1f07f450963b4cbd22")
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dataList, setDataList] = useState([]);
    const [logicalGroupName, setLogicalGroupName] = useState("");
    const [editId, setEditId] = useState(null);
    ///========== columns for datagrid table list ============\\
    const columns = [
        {
            field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
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
            headerName: "Category Name",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "Logical Group Name",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            width: 150,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }
    ];



    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!logicalGroupName.trim() && logicalGroupName.length === 0) {
            toast.error("Please enter a valid Logical Group Master");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": logicalGroupName,
                "lookup_type": "logical_group",
                "parent_lookup_type": "asset_type",
                "parent_lookup_id": selectedRiskLevel || null,
            }
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Logical Group Master updated successfully" : "Logical Group Master added successfully");
                setLogicalGroupName("");
                setEditId(null);
                fetchData(['logical_group'],'dataList', selectedRiskLevel);
            } else {
                toast.error(res.response.response_message || "Failed to add Logical Group Master");
            }
            setIsLoading(false);
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
            setDataList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['logical_group'], 'dataList', selectedRiskLevel);
    }, [selectedRiskLevel]);
    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        setSelectedRiskLevel(row?.parent_lookup_id || '');
        setLogicalGroupName(row?.lookup_value || '');
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Logical Group Master deleted successfully");
                    fetchData(['logical_group'],'dataList', selectedRiskLevel);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Logical Group Master"
                description="Add or update the required details for the Logical Group master to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-2 flex-col">
                        <label className="text-base font-semibold">
                            Category
                        </label>
                        <div className="flex gap-2">
                            {[{
                                "_id": "68cb9d1f07f450963b4cbd22",
                                "lookup_type": "asset_type",
                                "lookup_value": "Driver",
                            },
                            {
                                "_id": "68cb9d3b07f450963b4cbd3a",
                                "lookup_type": "asset_type",
                                "lookup_value": "Vehicle",
                            }].map((level) => (
                                <label key={level?._id} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="riskLevel"
                                        value={level?._id}
                                        checked={selectedRiskLevel === level?._id}
                                        onChange={(e) => setSelectedRiskLevel(e.target.value)}
                                        className="hidden"
                                    />
                                    <div
                                        className={`flex items-center gap-2 rounded-lg transition-all ${selectedRiskLevel === level
                                            ? "text-primary border-primary"
                                            : "text-muted-foreground border-border "
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRiskLevel === level?._id ? "border-primary" : "border-muted-foreground"
                                                }`}
                                        >
                                            {selectedRiskLevel === level?._id && (
                                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                        <span className="text-base font-medium">{level?.lookup_value}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <FormInput
                        label="Logical Group Name"
                        name="logicalGroup"
                        placeholder="Enter Logical Group Name"
                        value={logicalGroupName}
                        onChange={(e) => setLogicalGroupName(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}>{isLoading ? editId ? "Updating..." : "Adding..." : editId ? "Update Logical Group" : "Add Logical Group"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={dataList}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
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

export default LogicalGroup