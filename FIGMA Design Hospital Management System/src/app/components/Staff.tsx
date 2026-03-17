import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
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

interface StaffMember {
  id: number;
  staffNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dateOfBirth: string;
  sex: string;
  nin: string;
  position: string;
  currentSalary: number;
  salaryScale: string;
  hoursPerWeek: number;
  paidWeekly: boolean;
  qualificationType: string;
  qualificationDate: string;
  institution: string;
  workExperience: string;
}

export function Staff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    dateOfBirth: "",
    sex: "",
    nin: "",
    position: "",
    currentSalary: "",
    salaryScale: "",
    hoursPerWeek: "",
    paidWeekly: "true",
    qualificationType: "",
    qualificationDate: "",
    institution: "",
    workExperience: "",
  });

  // Mock data
  const [staff] = useState<StaffMember[]>([
    {
      id: 1,
      staffNumber: "S-0001",
      firstName: "Mary",
      lastName: "Johnson",
      address: "45 Oak Street, Boston, MA",
      phone: "555-0301",
      dateOfBirth: "1985-05-12",
      sex: "Female",
      nin: "NI123456A",
      position: "Charge Nurse",
      currentSalary: 65000,
      salaryScale: "Grade 5",
      hoursPerWeek: 40,
      paidWeekly: false,
      qualificationType: "RN - Registered Nurse",
      qualificationDate: "2007-06-15",
      institution: "Boston College of Nursing",
      workExperience: "15 years in ICU and Emergency Care",
    },
    {
      id: 2,
      staffNumber: "S-0002",
      firstName: "Patricia",
      lastName: "Wilson",
      address: "67 Maple Ave, Boston, MA",
      phone: "555-0302",
      dateOfBirth: "1990-08-22",
      sex: "Female",
      nin: "NI234567B",
      position: "Staff Nurse",
      currentSalary: 52000,
      salaryScale: "Grade 3",
      hoursPerWeek: 37.5,
      paidWeekly: true,
      qualificationType: "RN - Registered Nurse",
      qualificationDate: "2012-05-20",
      institution: "Massachusetts School of Nursing",
      workExperience: "8 years in General Ward",
    },
    {
      id: 3,
      staffNumber: "S-0003",
      firstName: "John",
      lastName: "Anderson",
      address: "89 Pine Road, Boston, MA",
      phone: "555-0303",
      dateOfBirth: "1988-03-10",
      sex: "Male",
      nin: "NI345678C",
      position: "Nurse",
      currentSalary: 48000,
      salaryScale: "Grade 2",
      hoursPerWeek: 40,
      paidWeekly: true,
      qualificationType: "RN - Registered Nurse",
      qualificationDate: "2010-07-12",
      institution: "Boston Medical Institute",
      workExperience: "10 years in Pediatric Care",
    },
  ]);

  const filteredStaff = staff.filter((member) =>
    `${member.firstName} ${member.lastName} ${member.staffNumber} ${member.position}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Staff data:", formData);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Staff Management</h2>
          <p className="text-gray-600 mt-1">Manage nursing and support staff records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm text-gray-700">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nin">National Insurance Number (NIN)</Label>
                  <Input
                    id="nin"
                    placeholder="e.g., NI123456A"
                    value={formData.nin}
                    onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm text-gray-700">Position & Salary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Charge Nurse">Charge Nurse</SelectItem>
                        <SelectItem value="Staff Nurse">Staff Nurse</SelectItem>
                        <SelectItem value="Nurse">Nurse</SelectItem>
                        <SelectItem value="Auxiliary">Auxiliary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryScale">Salary Scale</Label>
                    <Input
                      id="salaryScale"
                      placeholder="e.g., Grade 5"
                      value={formData.salaryScale}
                      onChange={(e) => setFormData({ ...formData, salaryScale: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentSalary">Current Salary ($)</Label>
                    <Input
                      id="currentSalary"
                      type="number"
                      value={formData.currentSalary}
                      onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours/Week</Label>
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      step="0.5"
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidWeekly">Pay Frequency</Label>
                    <Select value={formData.paidWeekly} onValueChange={(value) => setFormData({ ...formData, paidWeekly: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Weekly</SelectItem>
                        <SelectItem value="false">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm text-gray-700">Qualifications & Experience</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualificationType">Qualification Type</Label>
                    <Input
                      id="qualificationType"
                      placeholder="e.g., RN - Registered Nurse"
                      value={formData.qualificationType}
                      onChange={(e) => setFormData({ ...formData, qualificationType: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualificationDate">Qualification Date</Label>
                    <Input
                      id="qualificationDate"
                      type="date"
                      value={formData.qualificationDate}
                      onChange={(e) => setFormData({ ...formData, qualificationDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Qualifying Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workExperience">Work Experience</Label>
                  <Textarea
                    id="workExperience"
                    rows={3}
                    placeholder="Describe previous work experience..."
                    value={formData.workExperience}
                    onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add Staff Member
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
            placeholder="Search staff by name, number, or position..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Staff No.</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">NIN</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Hours/Week</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Qualification</th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{member.staffNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {member.firstName} {member.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{member.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.nin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${member.currentSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.hoursPerWeek}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.qualificationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        <Eye className="w-4 h-4" />
                      </Button>
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
