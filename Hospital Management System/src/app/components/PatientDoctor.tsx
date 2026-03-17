import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
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

interface Assignment {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  assignedDate: string;
}

export function PatientDoctor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
  });

  // Mock data
  const [assignments] = useState<Assignment[]>([
    {
      id: 1,
      patientId: "P-0001",
      patientName: "John Doe",
      doctorId: "D-0001",
      doctorName: "Dr. Sarah Williams",
      specialty: "Cardiology",
      assignedDate: "2026-03-10",
    },
    {
      id: 2,
      patientId: "P-0002",
      patientName: "Jane Smith",
      doctorId: "D-0002",
      doctorName: "Dr. James Taylor",
      specialty: "Neurology",
      assignedDate: "2026-03-12",
    },
    {
      id: 3,
      patientId: "P-0003",
      patientName: "Robert Brown",
      doctorId: "D-0003",
      doctorName: "Dr. Maria Garcia",
      specialty: "Pediatrics",
      assignedDate: "2026-03-08",
    },
  ]);

  const filteredAssignments = assignments.filter((assignment) =>
    `${assignment.patientName} ${assignment.doctorName} ${assignment.specialty}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add to database
    console.log("Assignment data:", formData);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      doctorId: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Patient-Doctor Assignments</h2>
          <p className="text-gray-600 mt-1">Manage patient and doctor relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Assign Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Doctor to Patient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, patientId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P-0001">P-0001 - John Doe</SelectItem>
                    <SelectItem value="P-0002">P-0002 - Jane Smith</SelectItem>
                    <SelectItem value="P-0003">P-0003 - Robert Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorId">Doctor</Label>
                <Select
                  value={formData.doctorId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, doctorId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="D-0001">D-0001 - Dr. Sarah Williams (Cardiology)</SelectItem>
                    <SelectItem value="D-0002">D-0002 - Dr. James Taylor (Neurology)</SelectItem>
                    <SelectItem value="D-0003">D-0003 - Dr. Maria Garcia (Pediatrics)</SelectItem>
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
                  Assign
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
            placeholder="Search assignments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Doctor ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Assigned Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {assignment.patientId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {assignment.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {assignment.doctorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {assignment.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {assignment.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {assignment.assignedDate}
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
