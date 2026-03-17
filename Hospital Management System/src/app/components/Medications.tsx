import { useState } from "react";
import { Search, Plus, Edit, Trash2, Pill } from "lucide-react";
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

interface Medication {
  id: number;
  patientId: string;
  patientName: string;
  drugNumber: string;
  drugName: string;
  unitsPerDay: number;
  methodOfAdmin: string;
  startDate: string;
  finishDate: string;
}

export function Medications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    drugNumber: "",
    drugName: "",
    unitsPerDay: "",
    methodOfAdmin: "",
    startDate: "",
    finishDate: "",
  });

  // Mock data
  const [medications] = useState<Medication[]>([
    {
      id: 1,
      patientId: "P-0001",
      patientName: "John Doe",
      drugNumber: "D-001",
      drugName: "Aspirin",
      unitsPerDay: 2,
      methodOfAdmin: "Oral",
      startDate: "2026-03-10",
      finishDate: "2026-03-24",
    },
    {
      id: 2,
      patientId: "P-0002",
      patientName: "Jane Smith",
      drugNumber: "D-002",
      drugName: "Ibuprofen",
      unitsPerDay: 3,
      methodOfAdmin: "Oral",
      startDate: "2026-03-12",
      finishDate: "2026-03-19",
    },
    {
      id: 3,
      patientId: "P-0003",
      patientName: "Robert Brown",
      drugNumber: "D-003",
      drugName: "Amoxicillin",
      unitsPerDay: 2,
      methodOfAdmin: "Oral",
      startDate: "2026-03-08",
      finishDate: "2026-03-22",
    },
  ]);

  const filteredMedications = medications.filter((med) =>
    `${med.patientName} ${med.drugName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Medication data:", formData);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      drugNumber: "",
      drugName: "",
      unitsPerDay: "",
      methodOfAdmin: "",
      startDate: "",
      finishDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Patient Medications</h2>
          <p className="text-gray-600 mt-1">Manage patient medication records and prescriptions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Prescribe Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prescribe Medication</DialogTitle>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="drugNumber">Drug Number</Label>
                  <Input
                    id="drugNumber"
                    placeholder="e.g., D-001"
                    value={formData.drugNumber}
                    onChange={(e) => setFormData({ ...formData, drugNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drugName">Drug Name</Label>
                  <Input
                    id="drugName"
                    placeholder="e.g., Aspirin"
                    value={formData.drugName}
                    onChange={(e) => setFormData({ ...formData, drugName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitsPerDay">Units Per Day</Label>
                  <Input
                    id="unitsPerDay"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.unitsPerDay}
                    onChange={(e) => setFormData({ ...formData, unitsPerDay: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="methodOfAdmin">Method of Admin</Label>
                  <Select
                    value={formData.methodOfAdmin}
                    onValueChange={(value) => setFormData({ ...formData, methodOfAdmin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oral">Oral</SelectItem>
                      <SelectItem value="IV">IV (Intravenous)</SelectItem>
                      <SelectItem value="IM">IM (Intramuscular)</SelectItem>
                      <SelectItem value="Topical">Topical</SelectItem>
                      <SelectItem value="Inhalation">Inhalation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                  <Label htmlFor="finishDate">Finish Date</Label>
                  <Input
                    id="finishDate"
                    type="date"
                    value={formData.finishDate}
                    onChange={(e) => setFormData({ ...formData, finishDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Prescribe
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
            placeholder="Search medications by patient or drug name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Medications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Drug Number
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Drug Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Units/Day
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Finish Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedications.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-blue-600" />
                      <div>
                        <div>{med.patientName}</div>
                        <div className="text-xs text-gray-500">{med.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {med.drugNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{med.drugName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {med.unitsPerDay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {med.methodOfAdmin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {med.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {med.finishDate}
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
