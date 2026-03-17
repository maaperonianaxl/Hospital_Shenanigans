import { useState } from "react";
import { Search, Bed as BedIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Bed {
  id: number;
  bedNumber: string;
  ward: string;
  status: "Available" | "Occupied" | "Maintenance";
  patientName?: string;
  admissionDate?: string;
}

export function Beds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data
  const [beds] = useState<Bed[]>([
    {
      id: 1,
      bedNumber: "1A-001",
      ward: "Ward 1A",
      status: "Occupied",
      patientName: "John Doe",
      admissionDate: "2026-03-10",
    },
    {
      id: 2,
      bedNumber: "1A-002",
      ward: "Ward 1A",
      status: "Available",
    },
    {
      id: 3,
      bedNumber: "2B-001",
      ward: "Ward 2B",
      status: "Occupied",
      patientName: "Jane Smith",
      admissionDate: "2026-03-12",
    },
    {
      id: 4,
      bedNumber: "2B-002",
      ward: "Ward 2B",
      status: "Maintenance",
    },
    {
      id: 5,
      bedNumber: "3A-001",
      ward: "Ward 3A",
      status: "Available",
    },
    {
      id: 6,
      bedNumber: "3A-002",
      ward: "Ward 3A",
      status: "Occupied",
      patientName: "Robert Brown",
      admissionDate: "2026-03-08",
    },
  ]);

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || bed.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    available: beds.filter((b) => b.status === "Available").length,
    occupied: beds.filter((b) => b.status === "Occupied").length,
    maintenance: beds.filter((b) => b.status === "Maintenance").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Bed Management</h2>
        <p className="text-gray-600 mt-1">Monitor and manage bed availability</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Beds</p>
              <p className="text-3xl mt-2">{statusCounts.available}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BedIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Occupied Beds</p>
              <p className="text-3xl mt-2">{statusCounts.occupied}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <BedIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Under Maintenance</p>
              <p className="text-3xl mt-2">{statusCounts.maintenance}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <BedIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by bed number, ward, or patient name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeds.map((bed) => (
          <div
            key={bed.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    bed.status === "Available"
                      ? "bg-green-100"
                      : bed.status === "Occupied"
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <BedIcon
                    className={`w-6 h-6 ${
                      bed.status === "Available"
                        ? "text-green-600"
                        : bed.status === "Occupied"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg">{bed.bedNumber}</h3>
                  <p className="text-sm text-gray-600">{bed.ward}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  bed.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : bed.status === "Occupied"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {bed.status}
              </span>
            </div>

            {bed.status === "Occupied" && bed.patientName && (
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patient:</span>
                  <span>{bed.patientName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Admitted:</span>
                  <span>{bed.admissionDate}</span>
                </div>
              </div>
            )}

            {bed.status === "Available" && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-green-600 text-center">Ready for assignment</p>
              </div>
            )}

            {bed.status === "Maintenance" && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-yellow-600 text-center">Currently unavailable</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
