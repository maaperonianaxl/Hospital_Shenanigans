import { useState } from "react";
import { Search, Plus, Trash2, Clock } from "lucide-react";
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

interface WaitingListEntry {
  id: number;
  patientId: string;
  patientName: string;
  wardRequired: string;
  expectedStayDuration: number;
  dateOnWaitingList: string;
  status: "Waiting" | "Admitted" | "Cancelled";
}

export function WaitingList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    wardRequired: "",
    expectedStayDuration: "",
  });

  // Mock data
  const [waitingList] = useState<WaitingListEntry[]>([
    {
      id: 1,
      patientId: "P-0005",
      patientName: "Alice Johnson",
      wardRequired: "Ward 1A - General",
      expectedStayDuration: 7,
      dateOnWaitingList: "2026-03-14",
      status: "Waiting",
    },
    {
      id: 2,
      patientId: "P-0006",
      patientName: "Michael Chen",
      wardRequired: "Ward 2B - ICU",
      expectedStayDuration: 14,
      dateOnWaitingList: "2026-03-13",
      status: "Waiting",
    },
    {
      id: 3,
      patientId: "P-0007",
      patientName: "Emily Davis",
      wardRequired: "Ward 3A - Pediatric",
      expectedStayDuration: 5,
      dateOnWaitingList: "2026-03-12",
      status: "Waiting",
    },
  ]);

  const filteredList = waitingList.filter((entry) =>
    `${entry.patientName} ${entry.wardRequired}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waiting list data:", formData);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      wardRequired: "",
      expectedStayDuration: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Waiting List</h2>
          <p className="text-gray-600 mt-1">Manage patients waiting for ward placement</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add to Waiting List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Patient to Waiting List</DialogTitle>
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
                    <SelectItem value="P-0005">P-0005 - Alice Johnson</SelectItem>
                    <SelectItem value="P-0006">P-0006 - Michael Chen</SelectItem>
                    <SelectItem value="P-0007">P-0007 - Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wardRequired">Ward Required</Label>
                <Select
                  value={formData.wardRequired}
                  onValueChange={(value) => setFormData({ ...formData, wardRequired: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ward 1A - General">Ward 1A - General</SelectItem>
                    <SelectItem value="Ward 2B - ICU">Ward 2B - ICU</SelectItem>
                    <SelectItem value="Ward 3A - Pediatric">Ward 3A - Pediatric</SelectItem>
                    <SelectItem value="Ward 4C - Maternity">Ward 4C - Maternity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedStayDuration">Expected Stay Duration (days)</Label>
                <Input
                  id="expectedStayDuration"
                  type="number"
                  placeholder="Number of days"
                  value={formData.expectedStayDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedStayDuration: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Add to List
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
            placeholder="Search waiting list..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Waiting List Table */}
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
                  Ward Required
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Expected Stay (days)
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">
                  Date Added
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
              {filteredList.map((entry) => {
                const daysWaiting = Math.floor(
                  (new Date().getTime() - new Date(entry.dateOnWaitingList).getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{entry.patientId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{entry.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {entry.wardRequired}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {entry.expectedStayDuration} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{entry.dateOnWaitingList}</span>
                        <span className="text-xs text-gray-500">({daysWaiting}d ago)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          entry.status === "Waiting"
                            ? "bg-yellow-100 text-yellow-800"
                            : entry.status === "Admitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
