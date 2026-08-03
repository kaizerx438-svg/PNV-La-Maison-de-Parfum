"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  createdAt: Date;
  user: { name: string; email: string };
  order: { id: string; totalAmount: number } | null;
}

const statusColors: Record<string, string> = {
  OPEN: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<string, string> = {
  OPEN: "Ouvert",
  IN_PROGRESS: "En cours",
  RESOLVED: "Resolu",
  CLOSED: "Ferme",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

export default function SavManager({ tickets: initialTickets = [] }: { tickets: Ticket[] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const updateStatus = async (ticketId: string, status: string) => {
    const res = await fetch("/api/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, status }),
    });
    if (res.ok) {
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
      );
      toast.success("Statut mis a jour");
    }
  };

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "subject",
      header: "Sujet",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium">{row.original.subject}</p>
          <p className="text-xs text-muted-foreground">{row.original.user.name} · {row.original.user.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priorite",
      cell: ({ row }) => (
        <Badge className={priorityColors[row.original.priority]} variant="outline">
          {row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={(e) => updateStatus(row.original.id, e.target.value)}
          className="text-xs border rounded px-2 py-1 bg-background cursor-pointer focus:outline-none"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Message",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpandedTicket(
            expandedTicket === row.original.id ? null : row.original.id
          )}
        >
          {expandedTicket === row.original.id ? "Masquer" : "Voir"}
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: tickets,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Rechercher un ticket..."
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("subject")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <Badge variant="outline" className="ml-auto">
          {tickets.filter((t) => t.status === "OPEN").length} ouvert{tickets.filter((t) => t.status === "OPEN").length > 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedTicket === row.original.id && (
                    <TableRow key={`${row.id}-expanded`}>
                      <TableCell colSpan={5} className="bg-muted/50">
                        <div className="p-3 space-y-2">
                          <p className="text-sm font-medium">Message :</p>
                          <p className="text-sm text-muted-foreground">{row.original.message}</p>
                          {row.original.order && (
                            <p className="text-xs text-muted-foreground">
                              Commande liee : #{row.original.order.id.slice(-8).toUpperCase()} — {row.original.order.totalAmount.toFixed(2)} €
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucun ticket pour le moment
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} ticket{table.getFilteredRowModel().rows.length > 1 ? "s" : ""}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Precedent
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}