import { __postApiData } from ".";

const __getCommenApiDataList = async ({
    lookup_type,
    parent_lookup_id,
    isShort,
}) => {
    return __postApiData(`/api/v1/common/Lookuplist`, {
        lookup_type: lookup_type.join(","),
        parent_lookup_id: parent_lookup_id || null,
    })
        .then(res => {
            if (res.response && res.response.response_code == "200") {
                const list = res.data.map(item => ({
                    id: item._id,
                    name: item?.lookup_value,
                    ...item,
                }))
                return list
            }
            console.log("No valid response, returning empty array");
            return []
        })
        .catch(error => {
            console.error("Error in __getCommenApiDataList:", error);
            return []
        })
}

export { 
  __getCommenApiDataList, 
}
