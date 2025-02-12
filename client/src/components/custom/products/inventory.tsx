// components/custom/products/inventory.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowUpDown, PackageX, ShieldAlert, Store } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatsCard } from "@/components/custom/products/stats-card";
import { ProductSearch } from "./search";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./product-form";

const ProductsInventory = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    // Add your submission logic here
    setIsAddProductOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Product Inventory</h1>
        <p className="text-muted-foreground">Manage your products and track inventory levels</p>
        <Separator className="my-4" />
      </div>

      <div className="flex flex-col gap-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Products" value="245" description="Active products across all categories" icon={Store} />
          <StatsCard title="Pre-orders" value="89" description="Products in pre-order status" icon={Package} />
          <StatsCard title="Low Stock" value="12" description="Products below minimum stock level" icon={ShieldAlert} />
          <StatsCard title="Out of Stock" value="24" description="Products with zero inventory" icon={PackageX} />
        </div>

        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ProductSearch onSearch={handleSearch} onFilter={handleFilter} />
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <Button onClick={() => setIsAddProductOpen(true)} className="w-full sm:w-auto">
                  Add Product
                </Button>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <ProductForm onSubmit={handleSubmit} onClose={() => setIsAddProductOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="min-w-[200px]">
                      <Button variant="ghost" className="gap-1 p-0 font-semibold">
                        Product Name <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md bg-secondary" />
                    </TableCell>
                    <TableCell className="font-medium">
                      NCT DREAM - SUNNY TEN Fan Photo
                      <div className="text-sm text-muted-foreground">2024 Seasons Greetings</div>
                    </TableCell>
                    <TableCell>SGT-2024-001</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pre-order</Badge>
                    </TableCell>
                    <TableCell className="text-right">150</TableCell>
                    <TableCell className="text-right">₱650.00</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsInventory;
