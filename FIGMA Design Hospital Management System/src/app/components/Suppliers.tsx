import { useState } from "react";
import { Search, Plus, Edit, Trash2, Truck } from "lucide-react";
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

interface Supplier {
  id: number;
  supplierNumber: string;
  supplierName: string;
  address: string;
  phone: string;
  faxNumber: string;
  itemsSupplied: number;
}

export function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierNumber: "",
    supplierName: "",
    address: "",
    phone: "",
    faxNumber: "",
  });

  // Mock data
  const [suppliers] = useState<Supplier[]>([
    {
      id: 1,
      supplierNumber: "SUP-001",
      supplierName: "MedSupply Inc.",
      address: "123 Supply Street, Boston, MA 02101",
      phone: "555-0601",
      faxNumber: "555-0602",
      itemsSupplied: 45,
    },
    {
      id: 2,
      supplierNumber: "SUP-002",
      supplierName: "Boston Pharmaceuticals",
      address: "456 Pharma Avenue, Boston, MA 02102",
      phone: "555-0603",
      faxNumber: "555-0604",
      itemsSupplied: 78,
    },
    {
      id: 3,
      supplierNumber: "SUP-003",
      supplierName: "Surgical Supplies Co.",
      address: "789 Medical Plaza, Boston, MA 02103",
      phone: "555-0605",
      faxNumber: "555-0606",
      itemsSupplied: 32,
    },
  ]);

  const filteredSuppliers = suppliers.filter((supplier) =>
    `${supplier.supplierName} ${supplier.supplierNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Supplier data:", formData);
    setIsDialogOpen(false);
    setFormData({
      supplierNumber: "",
      supplierName: "",
      address: "",
      phone: "",
      faxNumber: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Supplier Management</h2>
          <p className="text-gray-600 mt-1">Manage supply vendors and contacts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplierNumber">Supplier Number</Label>
                <Input
                  id="supplierNumber"
                  placeholder="e.g., SUP-001"
                  value={formData.supplierNumber}
                  onChange={(e) => setFormData({ ...formData, supplierNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input
                  id="supplierName"
                  placeholder="Enter supplier name"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faxNumber">Fax Number</Label>
                  <Input
                    id="faxNumber"
                    placeholder="Fax number"
                    value={formData.faxNumber}
                    onChange={(e) => setFormData({ ...formData, faxNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Supplier
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search suppliers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg">{supplier.supplierName}</h3>
                  <p className="text-sm text-gray-600">{supplier.supplierNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Address:</span>
                <p className="mt-1">{supplier.address}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span>{supplier.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fax:</span>
                <span>{supplier.faxNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items Supplied:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {supplier.itemsSupplied}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
