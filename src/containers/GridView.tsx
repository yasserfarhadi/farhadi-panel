import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Container from '@mui/material/Container';
import { useAppSelector } from '../redux/hooks';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

interface Row {
  id: number;
  name: string;
  username: string;
  email: string | null;
}

interface Props {
  setModalHandler: (id: number) => void;
}

const GridView: React.FC<Props> = ({ setModalHandler }) => {
  const gridRef = React.useRef<GridApi | null>();

  const { param, data } = useAppSelector((store) => ({
    param: store.users.searchParam,
    data: store.users.data,
  }));
  React.useEffect(() => {
    if (gridRef.current) {
      gridRef.current.setQuickFilter(param);
    }
  }, [param]);

  const rowsData = React.useMemo(
    (rows: Row[] = []): Row[] => {
      if (data && data.length > 0) {
        data.forEach((item) => {
          rows.push({
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
          });
        });
      }
      return rows;
    },
    [data]
  );

  const columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 350 },
    {
      field: 'cta',
      headerName: 'Edit',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Button onClick={() => setModalHandler(params.data.id)}>
            Edit <EditIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
        <div
          className="ag-theme-alpine"
          style={{ height: '330px', width: '100%' }}
        >
          <AgGridReact
            rowData={rowsData}
            columnDefs={columnDefs}
            onGridReady={(grid) => (gridRef.current = grid.api)}
            pagination={true}
            paginationPageSize={5}
          ></AgGridReact>
        </div>
      </Container>
    </div>
  );
};

export default GridView;
