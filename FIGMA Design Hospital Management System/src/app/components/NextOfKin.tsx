import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
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

interface NextOfKin {
  id: number;
  patientId: string;
  patientName: string;
  kinFullName: string;
  relationship: string;
  address: string;
  phone: string;
}

export function NextOfKin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    kinFullName: "",
    relationship: "",
    address: "",
    phone: "",
  });

  // Mock data
  const [nextOfKinRecords] = useState<NextOfKin[]>([
    {
      id: 1,
      patientId: "P-0001",
      patientName: "John Doe",
      kinFullName: "Emily Doe",
      relationship: "Wife",
      address: "123 Main St, Boston, MA",
      phone: "555-0401",
    },
    {
      id: 2,
      patientId: "P-0002",
      patientName: "Jane Smith",
      kinFullName: "Robert Smith",
      relationship: "Husband",
      address: "456 Oak Ave, Boston, MA",
      phone: "555-0402",
    },
    {
      id: 3,
      patientId: "P-0003",
      patientName: "Robert Brown",
      kinFullName: "Alice Brown",
      relationship: "Sister",
      address: "789 Pine Rd, Boston, MA",
      phone: "555-0403",
    },
  ]);

  const filteredRecords = nextOfKinRecords.filter((record) =>
    `${record.patientName} ${record.kinFullName} ${record.relationship}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Next of kin data:", formData);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      kinFullName: "",
      relationship: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Next of Kin Information</h2>
          <p className="text-gray-600 mt-1">Manage emergency contact information for patients</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Next of Kin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Next of Kin</DialogTitle>
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
                <Label htmlFor="kinFullName">Next of Kin Full Name</Label>
                <Input
                  id="kinFullName"
                  placeholder="Enter full name"
                  value={formData.kinFullName}
                  onChange={(e) => setFormData({ ...formData, kinFullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={formData.relationship}
                  onValueChange={(value) => setFormData({ ...formData, relationship: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Wife">Wife</SelectItem>
                    <SelectItem value="Husband">Husband</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Son">Son</SelectItem>
                    <SelectItem value="Daughter">Daughter</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
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
                  Add Next of Kin
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
            placeholder="Search by patient or next of kin name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Next of Kin Table */}
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
                  Next of Kin
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Relationship
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{record.patientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{record.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{record.kinFullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.relationship}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.phone}
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
