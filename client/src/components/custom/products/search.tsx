// components/custom/products/search.tsx
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSearchProps {
  onSearch: (value: string) => void;
  onFilter: (status: string) => void;
}

export const ProductSearch = ({ onSearch, onFilter }: ProductSearchProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-1 flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-8" onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onFilter} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>
          <SelectItem value="pre-order">Pre-order</SelectItem>
          <SelectItem value="on-hand">On-hand</SelectItem>
          <SelectItem value="reserved">Reserved</SelectItem>
          <SelectItem value="sold-out">Sold Out</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" className="hidden sm:flex">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
