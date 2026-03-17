import { useState } from "react";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Supply {
  id: number;
  itemNumber: string;
  itemName: string;
  description: string;
  quantityInStock: number;
  reorderLevel: number;
  costPerUnit: number;
  category: "Pharmaceutical" | "Surgical" | "Non-Surgical";
}

export function Supplies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemNumber: "",
    itemName: "",
    description: "",
    quantityInStock: "",
    reorderLevel: "",
    costPerUnit: "",
    category: "",
  });

  // Mock data
  const [supplies] = useState<Supply[]>([
    {
      id: 1,
      itemNumber: "PH-001",
      itemName: "Paracetamol 500mg",
      description: "Pain relief tablets",
      quantityInStock: 5000,
      reorderLevel: 1000,
      costPerUnit: 0.15,
      category: "Pharmaceutical",
    },
    {
      id: 2,
      itemNumber: "SU-001",
      itemName: "Surgical Gloves (Box)",
      description: "Latex-free surgical gloves, size M",
      quantityInStock: 250,
      reorderLevel: 100,
      costPerUnit: 12.5,
      category: "Surgical",
    },
    {
      id: 3,
      itemNumber: "NS-001",
      itemName: "Bandages (Roll)",
      description: "Sterile cotton bandage rolls",
      quantityInStock: 800,
      reorderLevel: 200,
      costPerUnit: 2.5,
      category: "Non-Surgical",
    },
    {
      id: 4,
      itemNumber: "PH-002",
      itemName: "Antibiotics - Amoxicillin",
      description: "500mg capsules",
      quantityInStock: 3000,
      reorderLevel: 500,
      costPerUnit: 0.85,
      category: "Pharmaceutical",
    },
  ]);

  const filteredSupplies = supplies.filter((supply) => {
    const matchesSearch = `${supply.itemName} ${supply.itemNumber} ${supply.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || supply.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supply data:", formData);
    setIsDialogOpen(false);
    setFormData({
      itemNumber: "",
      itemName: "",
      description: "",
      quantityInStock: "",
      reorderLevel: "",
      costPerUnit: "",
      category: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Supply Management</h2>
          <p className="text-gray-600 mt-1">Manage pharmaceutical, surgical, and non-surgical supplies</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Supply Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Supply Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemNumber">Item Number</Label>
                  <Input
                    id="itemNumber"
                    placeholder="e.g., PH-001"
                    value={formData.itemNumber}
                    onChange={(e) => setFormData({ ...formData, itemNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                      <SelectItem value="Surgical">Surgical</SelectItem>
                      <SelectItem value="Non-Surgical">Non-Surgical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="Enter item name"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={2}
                  placeholder="Enter item description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantityInStock">Quantity in Stock</Label>
                  <Input
                    id="quantityInStock"
                    type="number"
                    value={formData.quantityInStock}
                    onChange={(e) => setFormData({ ...formData, quantityInStock: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costPerUnit">Cost Per Unit ($)</Label>
                  <Input
                    id="costPerUnit"
                    type="number"
                    step="0.01"
                    value={formData.costPerUnit}
                    onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search supplies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
              <SelectItem value="Surgical">Surgical</SelectItem>
              <SelectItem value="Non-Surgical">Non-Surgical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Supplies Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Item No.
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  In Stock
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Reorder Level
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Cost/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSupplies.map((supply) => {
                const needsReorder = supply.quantityInStock <= supply.reorderLevel;
                return (
                  <tr key={supply.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        {supply.itemNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div>
                        <div>{supply.itemName}</div>
                        <div className="text-xs text-gray-500">{supply.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          supply.category === "Pharmaceutical"
                            ? "bg-purple-100 text-purple-800"
                            : supply.category === "Surgical"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {supply.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supply.quantityInStock.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supply.reorderLevel.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ${supply.costPerUnit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          needsReorder
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {needsReorder ? "Reorder" : "In Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
