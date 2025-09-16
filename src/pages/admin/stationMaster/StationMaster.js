import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { DataGrid } from '@mui/x-data-grid';

const validationSchema = Yup.object({
    stationType: Yup.string().required("Station Type is required"),
    parentStationId: Yup.string().required("Parent Station ID is required"),
    stationName: Yup.string().required("Station Name is required"),
    addressLine1: Yup.string().required("Address Line 1 is required"),
    addressLine2: Yup.string(),
    postalCode: Yup.string().required("Postal Code is required").matches(/^[0-9]{6}$/, "Postal Code must be 6 digits"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    geoLocation: Yup.string().required("GeoLocation is required"),
});


const StationMaster = () => {
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const columns = [
        { field: "_id", headerName: "ID", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true },
        { field: "stationType", headerName: "Station Type", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center",},
        { field: "parentStationId", headerName: "Parent Station ID", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "stationName", headerName: "Station Name", minWidth: 200, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "addressLine1", headerName: "Address Line 1", minWidth: 200, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "addressLine2", headerName: "Address Line 2", minWidth: 200, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "city", headerName: "City", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "state", headerName: "State", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "pincode", headerName: "Pincode", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },
        { field: "geoLocation", headerName: "Geo Location", minWidth: 150, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", },

    ];
    const [dataList, setDataList] = useState({
        stateList: [],
        cityList: [],
    });

    ///========== destructuring dataList ============\\
    const { stateList, cityList } = dataList;

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

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
        fetchData(['state'], "stateList");
        fetchData(['city'], "cityList");
    }, []);


    const formik = useFormik({
        initialValues: {
            stationType: "",
            stationId: "",
            parentStationId: "",
            stationName: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
            state: "",
            city: "",
            geoLocation: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("values", values);
            const newRow = {
                _id: rows.length + 1, // Auto-generate ID
                ...values,
            };
            setRows((prev) => [...prev, newRow]);
            resetForm();
        },
    });
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Station Master"
                description="Add or update station master with detailed fields."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-lg  rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        id="stationType"
                        name="stationType"
                        label="Station Type"
                        value={formik.values.stationType}
                        onChange={formik.handleChange}
                        error={formik.touched.stationType && Boolean(formik.errors.stationType)}
                        helperText={formik.touched.stationType && formik.errors.stationType}
                    />
                    <FormInput
                        id="parentStationId"
                        name="parentStationId"
                        label="Parent Station ID"
                        type="select"
                        value={formik.values.parentStationId}
                        onChange={formik.handleChange}
                        error={formik.touched.parentStationId && Boolean(formik.errors.parentStationId)}
                        helperText={formik.touched.parentStationId && formik.errors.parentStationId}
                        options={[{ _id: 1, lookup_value: "station 1" }, { _id: 2, lookup_value: "station 2" }]}
                    />
                    <FormInput
                        id="stationName"
                        name="stationName"
                        label="Station Name"
                        placeholder={"Enter Station Name"}
                        value={formik.values.stationName}
                        onChange={formik.handleChange}
                        error={formik.touched.stationName && Boolean(formik.errors.stationName)}
                        helperText={formik.touched.stationName && formik.errors.stationName}
                    />
                    <FormInput
                        id="addressLine1"
                        name="addressLine1"
                        label="Address Line 1"
                        placeholder={"Enter Address Line 1"}
                        value={formik.values.addressLine1}
                        onChange={formik.handleChange}
                        error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                        helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                    />
                    <FormInput
                        id="addressLine2"
                        name="addressLine2"
                        label="Address Line 2"
                        placeholder={"Enter Address Line 2"}
                        value={formik.values.addressLine2}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        id="postalCode"
                        name="postalCode"
                        label="Postal Code"
                        placeholder={"Enter Postal Code"}
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                        helperText={formik.touched.postalCode && formik.errors.postalCode}
                    />
                    <FormInput
                        type='select'
                        id="state"
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        options={stateList}
                    />
                    <FormInput
                        type='select'
                        id="city"
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        options={cityList}
                    />
                    <FormInput
                        id="geoLocation"
                        name="geoLocation"
                        label="GeoLocation"
                        placeholder={"Enter GeoLocation Ex:28.7041, 77.1025"}
                        value={formik.values.geoLocation}
                        onChange={formik.handleChange}
                        error={formik.touched.geoLocation && Boolean(formik.errors.geoLocation)}
                        helperText={formik.touched.geoLocation && formik.errors.geoLocation}
                    />
                </div>
                <div className="mt-4">
                    <FormButton disable={loading}>
                        {loading ? editId ? "Updating..." : "Saving..." : editId ? "Update Station" : "Add Station"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[]}
                />

            </div>
        </div >
    )
}

export default StationMaster