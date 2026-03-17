import { useState } from "react";
import { Search, Plus, Trash2, Calendar } from "lucide-react";
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

interface StaffAllocation {
  id: number;
  staffNumber: string;
  staffName: string;
  position: string;
  wardName: string;
  shift: "Early" | "Late" | "Night";
  startDate: string;
  endDate?: string;
}

export function StaffAllocation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    staffNumber: "",
    wardId: "",
    shift: "",
    startDate: "",
    endDate: "",
  });

  // Mock data
  const [allocations] = useState<StaffAllocation[]>([
    {
      id: 1,
      staffNumber: "S-0001",
      staffName: "Mary Johnson",
      position: "Charge Nurse",
      wardName: "Ward 1A",
      shift: "Early",
      startDate: "2026-03-01",
    },
    {
      id: 2,
      staffNumber: "S-0002",
      staffName: "Patricia Wilson",
      position: "Staff Nurse",
      wardName: "Ward 2B",
      shift: "Late",
      startDate: "2026-03-01",
    },
    {
      id: 3,
      staffNumber: "S-0003",
      staffName: "John Anderson",
      position: "Nurse",
      wardName: "Ward 3A",
      shift: "Night",
      startDate: "2026-03-01",
    },
  ]);

  const filteredAllocations = allocations.filter((allocation) =>
    `${allocation.staffName} ${allocation.wardName} ${allocation.position}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Allocation data:", formData);
    setIsDialogOpen(false);
    setFormData({
      staffNumber: "",
      wardId: "",
      shift: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Staff Allocation to Wards</h2>
          <p className="text-gray-600 mt-1">Manage staff assignments and shift schedules</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Allocate Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Staff to Ward</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffNumber">Staff Member</Label>
                <Select
                  value={formData.staffNumber}
                  onValueChange={(value) => setFormData({ ...formData, staffNumber: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S-0001">S-0001 - Mary Johnson (Charge Nurse)</SelectItem>
                    <SelectItem value="S-0002">S-0002 - Patricia Wilson (Staff Nurse)</SelectItem>
                    <SelectItem value="S-0003">S-0003 - John Anderson (Nurse)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wardId">Ward</Label>
                <Select
                  value={formData.wardId}
                  onValueChange={(value) => setFormData({ ...formData, wardId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="W-0001">Ward 1A - General</SelectItem>
                    <SelectItem value="W-0002">Ward 2B - ICU</SelectItem>
                    <SelectItem value="W-0003">Ward 3A - Pediatric</SelectItem>
                    <SelectItem value="W-0004">Ward 4C - Maternity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select
                  value={formData.shift}
                  onValueChange={(value) => setFormData({ ...formData, shift: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Early">Early (7:00 AM - 3:00 PM)</SelectItem>
                    <SelectItem value="Late">Late (3:00 PM - 11:00 PM)</SelectItem>
                    <SelectItem value="Night">Night (11:00 PM - 7:00 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Allocate
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
            placeholder="Search allocations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Allocations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Staff No.
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Staff Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAllocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{allocation.staffNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{allocation.staffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{allocation.wardName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        allocation.shift === "Early"
                          ? "bg-yellow-100 text-yellow-800"
                          : allocation.shift === "Late"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {allocation.shift}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.endDate || "Ongoing"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
