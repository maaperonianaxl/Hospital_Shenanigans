import { useState } from "react";
import { Search, Plus, Edit, Trash2, Building2 } from "lucide-react";
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

interface Ward {
  id: number;
  name: string;
  type: string;
  floor: number;
  capacity: number;
  occupied: number;
  status: string;
}

export function Wards() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    floor: "",
    capacity: "",
  });

  // Mock data
  const [wards] = useState<Ward[]>([
    {
      id: 1,
      name: "Ward 1A",
      type: "General",
      floor: 1,
      capacity: 20,
      occupied: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Ward 2B",
      type: "ICU",
      floor: 2,
      capacity: 10,
      occupied: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Ward 3A",
      type: "Pediatric",
      floor: 3,
      capacity: 15,
      occupied: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "Ward 4C",
      type: "Maternity",
      floor: 4,
      capacity: 12,
      occupied: 7,
      status: "Active",
    },
  ]);

  const filteredWards = wards.filter((ward) =>
    `${ward.name} ${ward.type}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add to database
    console.log("Ward data:", formData);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      type: "",
      floor: "",
      capacity: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Ward Management</h2>
          <p className="text-gray-600 mt-1">Manage and view all ward information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Ward
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ward</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ward Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Ward 5A"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Ward Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="ICU">ICU</SelectItem>
                    <SelectItem value="Pediatric">Pediatric</SelectItem>
                    <SelectItem value="Maternity">Maternity</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="Floor number"
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Bed capacity"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Ward
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
            placeholder="Search wards by name or type..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Wards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWards.map((ward) => {
          const occupancyRate = (ward.occupied / ward.capacity) * 100;
          return (
            <div
              key={ward.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg">{ward.name}</h3>
                    <p className="text-sm text-gray-600">{ward.type}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    ward.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ward.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floor:</span>
                  <span>{ward.floor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span>{ward.capacity} beds</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Occupied:</span>
                  <span>{ward.occupied} beds</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Occupancy Rate:</span>
                    <span>{occupancyRate.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        occupancyRate >= 90
                          ? "bg-red-500"
                          : occupancyRate >= 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
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
          );
        })}
      </div>
    </div>
  );
}
