import { useState } from "react";
import { Search, Plus, Trash2, Building2, Bed } from "lucide-react";
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

interface WardBed {
  id: number;
  wardId: string;
  wardName: string;
  bedNumber: string;
  bedStatus: "Available" | "Occupied" | "Maintenance";
}

export function WardBeds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    wardId: "",
    bedNumber: "",
    bedStatus: "",
  });

  // Mock data
  const [wardBeds] = useState<WardBed[]>([
    {
      id: 1,
      wardId: "W-0001",
      wardName: "Ward 1A",
      bedNumber: "1A-001",
      bedStatus: "Occupied",
    },
    {
      id: 2,
      wardId: "W-0001",
      wardName: "Ward 1A",
      bedNumber: "1A-002",
      bedStatus: "Available",
    },
    {
      id: 3,
      wardId: "W-0002",
      wardName: "Ward 2B",
      bedNumber: "2B-001",
      bedStatus: "Occupied",
    },
    {
      id: 4,
      wardId: "W-0002",
      wardName: "Ward 2B",
      bedNumber: "2B-002",
      bedStatus: "Maintenance",
    },
    {
      id: 5,
      wardId: "W-0003",
      wardName: "Ward 3A",
      bedNumber: "3A-001",
      bedStatus: "Available",
    },
  ]);

  const filteredWardBeds = wardBeds.filter((wb) =>
    `${wb.wardName} ${wb.bedNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Group beds by ward
  const bedsByWard = filteredWardBeds.reduce((acc, bed) => {
    if (!acc[bed.wardName]) {
      acc[bed.wardName] = [];
    }
    acc[bed.wardName].push(bed);
    return acc;
  }, {} as Record<string, WardBed[]>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add to database
    console.log("Ward bed data:", formData);
    setIsDialogOpen(false);
    setFormData({
      wardId: "",
      bedNumber: "",
      bedStatus: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Ward-Bed Relationships</h2>
          <p className="text-gray-600 mt-1">Manage beds within each ward</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Bed to Ward
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bed to Ward</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wardId">Ward</Label>
                <Select
                  value={formData.wardId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, wardId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="W-0001">Ward 1A - General</SelectItem>
                    <SelectItem value="W-0002">Ward 2B - ICU</SelectItem>
                    <SelectItem value="W-0003">Ward 3A - Pediatric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedNumber">Bed Number</Label>
                <Input
                  id="bedNumber"
                  placeholder="e.g., 1A-003"
                  value={formData.bedNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, bedNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedStatus">Initial Status</Label>
                <Select
                  value={formData.bedStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bedStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
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
                  Add Bed
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
            placeholder="Search by ward or bed number..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Ward Beds Display */}
      <div className="space-y-6">
        {Object.entries(bedsByWard).map(([wardName, beds]) => {
          const availableCount = beds.filter((b) => b.bedStatus === "Available").length;
          const occupiedCount = beds.filter((b) => b.bedStatus === "Occupied").length;
          const maintenanceCount = beds.filter((b) => b.bedStatus === "Maintenance").length;

          return (
            <div key={wardName} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg">{wardName}</h3>
                  <p className="text-sm text-gray-600">
                    {beds.length} beds total • {availableCount} available • {occupiedCount} occupied • {maintenanceCount} maintenance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                {beds.map((bed) => (
                  <div
                    key={bed.id}
                    className={`border-2 rounded-lg p-4 ${
                      bed.bedStatus === "Available"
                        ? "border-green-200 bg-green-50"
                        : bed.bedStatus === "Occupied"
                        ? "border-red-200 bg-red-50"
                        : "border-yellow-200 bg-yellow-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bed
                          className={`w-4 h-4 ${
                            bed.bedStatus === "Available"
                              ? "text-green-600"
                              : bed.bedStatus === "Occupied"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        />
                        <span className="text-sm">{bed.bedNumber}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        bed.bedStatus === "Available"
                          ? "bg-green-200 text-green-800"
                          : bed.bedStatus === "Occupied"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {bed.bedStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
