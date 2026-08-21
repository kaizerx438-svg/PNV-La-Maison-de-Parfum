"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, Plus, Pencil, Trash2, PackageX, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, Category } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";

type ProductWithCategory = Product & { category: Category };

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  DRAFT: "bg-yellow-100 text-yellow-800",
  OUT_OF_STOCK: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Actif",
  DRAFT: "Brouillon",
  OUT_OF_STOCK: "Rupture",
};

const concentrationLabels: Record<string, string> = {
  EAU_DE_COLOGNE: "EDC",
  EAU_DE_TOILETTE: "EDT",
  EAU_DE_PARFUM: "EDP",
  PARFUM_EXTRAIT: "Extrait",
};

export default function ProductsManager({
  products: initialProducts = [],
  categories = [],
}: {
  products: ProductWithCategory[];
  categories: Category[];
}){
  const [products, setProducts] = React.useState(initialProducts);
  const [showForm, setShowForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<ProductWithCategory | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [form, setForm] = React.useState({
    name: "", description: "", price: "", stock: "",
    concentration: "EAU_DE_PARFUM", volumeMl: "50",
    notesTete: "", notesCoeur: "", notesFond: "",
    imageUrl: "", featured: false, status: "ACTIVE",
    discountPercent: "0", categoryId: categories[0]?.id || "",
  });

  const resetForm = () => {
    setForm({
      name: "", description: "", price: "", stock: "",
      concentration: "EAU_DE_PARFUM", volumeMl: "50",
      notesTete: "", notesCoeur: "", notesFond: "",
      imageUrl: "", featured: false, status: "ACTIVE",
      discountPercent: "0", categoryId: categories[0]?.id || "",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: ProductWithCategory) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      concentration: product.concentration || "EAU_DE_PARFUM",
      volumeMl: product.volumeMl?.toString() || "50",
      notesTete: product.notesTete || "",
      notesCoeur: product.notesCoeur || "",
      notesFond: product.notesFond || "",
      imageUrl: product.imageUrl || "",
      featured: product.featured,
      status: product.status,
      discountPercent: product.discountPercent.toString(),
      categoryId: product.categoryId,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      const method = editingProduct ? "PATCH" : "POST";
      const body = editingProduct ? { id: editingProduct.id, ...form } : form;
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...data.product, category: categories.find((c) => c.id === data.product.categoryId)! }
              : p
          )
        );
        toast.success("Produit mis a jour");
      } else {
        const category = categories.find((c) => c.id === data.product.categoryId)!;
        setProducts((prev) => [{ ...data.product, category }, ...prev]);
        toast.success("Produit cree");
      }
      resetForm();
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produit supprime");
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const product = products.find((p) => p.id === id)!;
      await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          status,
          featured: product.featured,
          discountPercent: product.discountPercent,
          notesTete: product.notesTete,
          notesCoeur: product.notesCoeur,
          notesFond: product.notesFond,
          imageUrl: product.imageUrl,
        }),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: status as "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" } : p))
      );
      toast.success("Statut mis a jour");
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const columns: ColumnDef<ProductWithCategory>[] = [
    {
      accessorKey: "name",
      header: "Produit",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.imageUrl && (
            <div className="w-10 h-10 flex-shrink-0 relative overflow-hidden rounded-sm bg-gray-100">
              <Image src={row.original.imageUrl} alt={row.original.name} fill sizes="40px" className="object-cover" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium">{row.original.name}</p>
              {row.original.featured && <Star className="w-3 h-3 text-yellow-500" />}
            </div>
            <p className="text-xs text-muted-foreground">
              {concentrationLabels[row.original.concentration || ""] || ""} · {row.original.volumeMl}ml
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categorie",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.original.category.name}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ row }) => (
        <div>
          <span className="text-sm font-medium">{row.original.price.toFixed(2)} FCFA</span>
          {row.original.discountPercent > 0 && (
            <span className="ml-1 text-xs text-red-500">-{row.original.discountPercent}%</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <span
          className="text-sm font-medium"
          style={{
            color: row.original.stock <= 3 ? "#dc2626" : row.original.stock <= 10 ? "#d97706" : "inherit",
          }}
        >
          {row.original.stock}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status] || ""} variant="outline">
          {statusLabels[row.original.status] || row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)} title="Modifier">
            <Pencil className="w-4 h-4 text-yellow-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleStatusChange(row.original.id, "OUT_OF_STOCK")} title="Rupture">
            <PackageX className="w-4 h-4 text-red-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)} title="Supprimer">
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="space-y-4">

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Rechercher un produit..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Colonnes <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((c) => c.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="ml-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="border rounded-lg p-6 space-y-4 bg-card">
          <h3 className="text-sm font-medium">
            {editingProduct ? "Modifier le produit" : "Nouveau produit"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Nom", key: "name" },
              { label: "Prix (FCFA)", key: "price", type: "number" },
              { label: "Stock", key: "stock", type: "number" },
              { label: "Volume (ml)", key: "volumeMl", type: "number" },
              { label: "Remise (%)", key: "discountPercent", type: "number" },
              { label: "Image URL", key: "imageUrl" },
              { label: "Notes de tete", key: "notesTete" },
              { label: "Notes de coeur", key: "notesCoeur" },
              { label: "Notes de fond", key: "notesFond" },
            ].map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs text-muted-foreground">{field.label}</label>
                <Input
                  type={field.type || "text"}
                  value={form[field.key as keyof typeof form] as string}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                />
              </div>
            ))}

            <div className="space-y-1 md:col-span-2 lg:col-span-3">
              <label className="text-xs text-muted-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-sm bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Categorie</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background cursor-pointer focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Concentration</label>
              <select
                value={form.concentration}
                onChange={(e) => setForm((prev) => ({ ...prev, concentration: e.target.value }))}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background cursor-pointer focus:outline-none"
              >
                {Object.entries(concentrationLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Statut</label>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background cursor-pointer focus:outline-none"
              >
                <option value="ACTIVE">Actif</option>
                <option value="DRAFT">Brouillon</option>
                <option value="OUT_OF_STOCK">Rupture de stock</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                className="cursor-pointer"
              />
              <label htmlFor="featured" className="text-sm cursor-pointer">Produit en vedette</label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              {editingProduct ? "Mettre a jour" : "Creer"}
            </Button>
            <Button variant="outline" onClick={resetForm}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Table */}
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun produit trouve
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} produit{table.getFilteredRowModel().rows.length > 1 ? "s" : ""}
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