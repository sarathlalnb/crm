import React, { useEffect, useState, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { endpoints } from "../../../defaults";
import useApi from "../../../hooks/useApi";
import { CSpinner } from "@coreui/react";
import { Chip, Stack, IconButton } from "@mui/material"; 
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";

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
      const { response, error } = apiResponse;
      if (response && response.data) {
        const data = await apiResponse.response.data.data;
        if (data.length === 0) {
          toast.info("No modules available");
        }
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
        setModules(transformedModules);
      } else {
        const { response: errRes } = error;
        const errorMessage =
          errRes?.data?.message || "Error Occurred. Please contact Admin !!";
        toast.error(errorMessage);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "created_at", headerName: "Created At", flex: 1, width: 10 },
    { field: "name", headerName: "Name", flex: 1, width: 150 },
    {
      field: "actions",
      headerName: "Operations",
      flex: 2.5,
      width: 150,
      renderCell: (params) => (
        <div className="module-parent">
          <Stack direction="row" spacing={1}>
            <Fragment>
              {params.row.actions.map((action) => (
                <Chip key={action.id} label={action.action.label} />
              ))}
            </Fragment>
          </Stack>
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Actions",
      flex: 1,
      width: 100,
      renderCell: (params) => (
        <div className="module-parent">
          <Stack direction="row" spacing={1}>
            {params.row.is_editable && ( // Render edit icon if module is editable
              <IconButton
                aria-label="edit"
                size="small"
                // onClick={() => handleEdit(params.row.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </div>
      ),
    },
  ];

  return (
    <div>
      <p className="h4">Modules</p>
      <div style={{ width: "100%" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DeveloperSettings;
