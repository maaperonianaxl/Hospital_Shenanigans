import { useState } from "react";
import { Search, Plus, Edit, Trash2, Stethoscope } from "lucide-react";
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

interface LocalDoctor {
  id: number;
  fullName: string;
  clinicNumber: string;
  address: string;
  phone: string;
  patientsReferred: number;
}

export function LocalDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    clinicNumber: "",
    address: "",
    phone: "",
  });

  // Mock data
  const [localDoctors] = useState<LocalDoctor[]>([
    {
      id: 1,
      fullName: "Dr. Michael Thompson",
      clinicNumber: "CLI-001",
      address: "45 Medical Plaza, Boston, MA",
      phone: "555-0501",
      patientsReferred: 15,
    },
    {
      id: 2,
      fullName: "Dr. Susan Roberts",
      clinicNumber: "CLI-002",
      address: "78 Health Center, Boston, MA",
      phone: "555-0502",
      patientsReferred: 23,
    },
    {
      id: 3,
      fullName: "Dr. David Martinez",
      clinicNumber: "CLI-003",
      address: "12 Family Practice Ave, Boston, MA",
      phone: "555-0503",
      patientsReferred: 18,
    },
  ]);

  const filteredDoctors = localDoctors.filter((doctor) =>
    `${doctor.fullName} ${doctor.clinicNumber} ${doctor.address}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Local doctor data:", formData);
    setIsDialogOpen(false);
    setFormData({
      fullName: "",
      clinicNumber: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Local Doctors (GP Referrals)</h2>
          <p className="text-gray-600 mt-1">Manage referring general practitioners</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Local Doctor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Local Doctor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Dr. Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinicNumber">Clinic Number</Label>
                <Input
                  id="clinicNumber"
                  placeholder="e.g., CLI-001"
                  value={formData.clinicNumber}
                  onChange={(e) => setFormData({ ...formData, clinicNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Clinic Address</Label>
                <Input
                  id="address"
                  placeholder="Enter clinic address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Doctor
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
            placeholder="Search local doctors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Local Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg">{doctor.fullName}</h3>
                  <p className="text-sm text-gray-600">{doctor.clinicNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-sm text-gray-600">Address:</span>
                <span className="text-sm flex-1">{doctor.address}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span>{doctor.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Patients Referred:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {doctor.patientsReferred}
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
