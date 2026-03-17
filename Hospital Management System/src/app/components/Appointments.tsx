import { useState } from "react";
import { Search, Plus, Edit, Trash2, Calendar, Clock } from "lucide-react";
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

interface Appointment {
  id: number;
  patientId: string;
  patientName: string;
  staffNumber: string;
  staffName: string;
  appointmentDate: string;
  appointmentTime: string;
  room: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    staffNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    room: "",
  });

  // Mock data
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      patientId: "P-0001",
      patientName: "John Doe",
      staffNumber: "S-0001",
      staffName: "Mary Johnson",
      appointmentDate: "2026-03-16",
      appointmentTime: "10:00",
      room: "Room 101",
      status: "Scheduled",
    },
    {
      id: 2,
      patientId: "P-0002",
      patientName: "Jane Smith",
      staffNumber: "S-0002",
      staffName: "Patricia Wilson",
      appointmentDate: "2026-03-16",
      appointmentTime: "11:30",
      room: "Room 102",
      status: "Scheduled",
    },
    {
      id: 3,
      patientId: "P-0003",
      patientName: "Robert Brown",
      staffNumber: "S-0003",
      staffName: "John Anderson",
      appointmentDate: "2026-03-15",
      appointmentTime: "14:00",
      room: "Room 103",
      status: "Completed",
    },
  ]);

  const filteredAppointments = appointments.filter((apt) =>
    `${apt.patientName} ${apt.staffName} ${apt.appointmentDate}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      staffNumber: "",
      appointmentDate: "",
      appointmentTime: "",
      room: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Patient Appointments</h2>
          <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData({ ...formData, patientId: value })}
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
                <Label htmlFor="staffNumber">Staff Member</Label>
                <Select
                  value={formData.staffNumber}
                  onValueChange={(value) => setFormData({ ...formData, staffNumber: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S-0001">S-0001 - Mary Johnson</SelectItem>
                    <SelectItem value="S-0002">S-0002 - Patricia Wilson</SelectItem>
                    <SelectItem value="S-0003">S-0003 - John Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Date</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      setFormData({ ...formData, appointmentDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Time</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      setFormData({ ...formData, appointmentTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  placeholder="e.g., Room 101"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Schedule
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
            placeholder="Search appointments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Room
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
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div>{apt.patientName}</div>
                      <div className="text-xs text-gray-500">{apt.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div>{apt.staffName}</div>
                      <div className="text-xs text-gray-500">{apt.staffNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {apt.appointmentDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {apt.appointmentTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{apt.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        apt.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : apt.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {apt.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
