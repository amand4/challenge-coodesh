import { Fragment, useMemo, useRef, useState } from "react";
import { Card } from "@mui/material";
import {
  DataGrid,
  GridPaginationModel,
  GridFilterModel,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface QueryParams {
  page: number;
  limit: number;
  [key: string]: string | number;
}

interface QueryResponse<R extends GridValidRowModel> {
  items: R[];
  total: number;
}

interface TableProps<R extends GridValidRowModel> {
  columns: GridColDef<R>[];
  useQuery: (params: QueryParams) => {
    data?: QueryResponse<R>;
    isLoading: boolean;
  };
}

const Table = <R extends GridValidRowModel>({
  columns,
  useQuery,
}: TableProps<R>) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const params = useMemo<QueryParams>(() => {
    const filters: Record<string, string | number> = {};

    filterModel.items.forEach((item) => {
      if (item.value !== undefined && item.value !== null) {
        filters[item.field] = item.value as string | number;
      }
    });

    return {
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      ...filters,
    };
  }, [paginationModel, filterModel]);

  const { data, isLoading } = useQuery(params);

  const rows = data?.items ?? [];

  const rowCountRef = useRef<number>(data?.total ?? 0);

  const rowCount = useMemo(() => {
    if (data?.total !== undefined) {
      rowCountRef.current = data.total;
    }
    return rowCountRef.current;
  }, [data?.total]);

  return (
    <Fragment>
      <Card
        sx={{
          pt: 1.25,
          mb: { xs: 10, sm: 5 },
        }}
      >
        <DataGrid<R>
          autoHeight
          rows={rows}
          columns={columns}
          loading={isLoading}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          filterModel={filterModel}
          pageSizeOptions={[10, 20, 50]}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onFilterModelChange={setFilterModel}
          disableRowSelectionOnClick
        />
      </Card>
    </Fragment>
  );
};

export default Table;
