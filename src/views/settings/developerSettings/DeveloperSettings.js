import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { endpoints } from "../../../defaults";
import useApi from "../../../hooks/useApi";
import { CSpinner } from "@coreui/react";

const DeveloperSettings = () => {
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const { request: getModules } = useApi("get");

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    setLoading(true);
    const URL = `${endpoints.MODULE_LIST}`;
    try {
      const apiResponse = await getModules(URL);
      const data = await apiResponse.response.data.data;
      const transformedModules = data.map((module) => ({
        id: module.id,
        created_at: module.created_at,
        title: module.title,
        name: module.name,
        is_editable: module.is_editable,
        is_deletable: module.is_deletable,
        is_deleted: module.is_deleted,
        is_active: module.is_active,
        actions: module.actions,
      }));
      console.log(transformedModules);
      setModules(transformedModules);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "created_at", headerName: "Created At", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "actions",
      headerName: "Operations",
      width: 300,
      renderCell: (params) => (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {params.value.map((action) => (
            <li key={action.id}>{action.action.label}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <p className="h4">Modules</p>
      <div style={{ width: "100%" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CSpinner variant="grow" />
          </div>
        ) : (
          <DataGrid
            rows={modules}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>
    </div>
  );
};

export default DeveloperSettings;
