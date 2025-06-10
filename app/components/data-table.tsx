"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contenido, PlanesEscolaresRoot } from "@/lib/types";

export interface IProps {
  data: Contenido[];
}
export default function DataTable(props: IProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Contenido>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "tema",
      filterFn: (row, id, filterValue) => {
        const tema = row.getValue("tema") as string;
        const subtemas = (row.original.subtemas ?? []) as Contenido[];
        // Convertimos todo a lowercase para que sea insensible a mayúsculas/minúsculas
        const filtro = (filterValue as string)?.toLowerCase() ?? "";

        if (!filtro) return true;

        // Buscar en el tema principal
        if (tema.toLowerCase().includes(filtro)) return true;

        // Buscar en los subtemas (por nombre)
        if (subtemas.some((st) => st.tema?.toLowerCase().includes(filtro)))
          return true;

        return false;
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tema
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-left ml-2">
          <h3 className="font-bold text-lg">{row.getValue("tema")}</h3>
          {row.original.subtemas ? (
            <ul className="list-disc ml-4">
              {row.original.subtemas.map((subtema) => {
                return <li key={subtema.tema}>{subtema.tema}</li>;
              })}
            </ul>
          ) : null}
        </div>
      ),
    },
    {
      accessorKey: "contenidos",
      header: "Contenidos",
      cell: ({ row }) => (
        <div className="text-wrap space-y-5 w-100">
          <div className="text-left">
            <strong>Procedimental: </strong>
            <span>{row.original.procedimental}</span>
          </div>
          <div className="text-left">
            <strong>Conceptual: </strong>
            <span>{row.original.conceptual}</span>
          </div>
          <div className="text-left">
            <strong>Actitudinal: </strong>
            <span>{row.original.actitudinal}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "actividades",
      header: "Actividades",
      cell: ({ row }) => (
        <ul className="text-wrap text-left space-y-3 w-100 list-disc">
          {(row.getValue("actividades") as Contenido["actividades"])!.map(
            (actividad) => {
              return <li key={actividad}>{actividad}</li>;
            }
          )}
        </ul>
      ),
    },
    {
      accessorKey: "indicadores",
      header: "Indicadores",
      cell: ({ row }) => (
        <ul className="text-wrap text-left space-y-3 w-100 list-disc">
          {(row.getValue("indicadores") as Contenido["indicadores"])!.map(
            (indcador) => {
              return <li key={indcador}>{indcador}</li>;
            }
          )}
        </ul>
      ),
    },
  ];

  const table = useReactTable({
    data: props.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtra por tema o subtema..."
          value={(table.getColumn("tema")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tema")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="text-wrap w-100"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
