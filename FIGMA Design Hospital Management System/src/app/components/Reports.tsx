import { FileText, Download, Calendar, Users, Building2, Pill, Package, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export function Reports() {
  const reports = [
    {
      id: 1,
      title: "Patient List by Ward",
      description: "Complete list of patients currently placed in each ward",
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Staff List by Position",
      description: "Details of staff members organized by their position",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Patient Medication Records",
      description: "Medication history for each patient including dosage and dates",
      icon: Pill,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Ward Staff Allocation",
      description: "Staff members allocated to each ward with shift details",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 5,
      title: "Supplies Reorder List",
      description: "Items that have reached or fallen below reorder level",
      icon: Package,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 6,
      title: "Patient Appointments",
      description: "Scheduled appointments for upcoming week",
      icon: Calendar,
      color: "bg-teal-100 text-teal-600",
    },
    {
      id: 7,
      title: "Waiting List Report",
      description: "Patients waiting for ward placement sorted by date",
      icon: Users,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 8,
      title: "Ward Occupancy Statistics",
      description: "Current occupancy rates and bed availability by ward",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 9,
      title: "Doctor-Patient Assignments",
      description: "List of patients assigned to each doctor",
      icon: Users,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 10,
      title: "Next of Kin Directory",
      description: "Emergency contact information for all patients",
      icon: FileText,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      id: 11,
      title: "Local Doctor Referrals",
      description: "Patients referred by local GPs with referral details",
      icon: Users,
      color: "bg-lime-100 text-lime-600",
    },
    {
      id: 12,
      title: "Supply Requisitions",
      description: "Ward supply requisition requests and fulfillment status",
      icon: Package,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 13,
      title: "Staff Qualifications Report",
      description: "Staff qualifications, experience, and salary details",
      icon: FileText,
      color: "bg-violet-100 text-violet-600",
    },
    {
      id: 14,
      title: "Supplier Performance",
      description: "Supplier details and items supplied to the hospital",
      icon: TrendingUp,
      color: "bg-fuchsia-100 text-fuchsia-600",
    },
  ];

  const handleGenerateReport = (reportTitle: string) => {
    console.log("Generating report:", reportTitle);
    // TODO: Implement report generation logic
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Reports & Analytics</h2>
        <p className="text-gray-600 mt-1">
          Generate and download various hospital management reports
        </p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reports</p>
              <p className="text-3xl mt-2">{reports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Generated This Month</p>
              <p className="text-3xl mt-2">127</p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Scheduled Reports</p>
              <p className="text-3xl mt-2">8</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Report Categories</p>
              <p className="text-3xl mt-2">6</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg">Available Reports</h3>
          <p className="text-sm text-gray-600 mt-1">
            Select a report to generate and download
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${report.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{report.title}</h4>
                      <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleGenerateReport(report.title)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                          onClick={() => handleGenerateReport(report.title)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg mb-4">Report Scheduling</h3>
        <p className="text-sm text-gray-600 mb-4">
          Set up automatic report generation and delivery via email
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Configure Scheduled Reports
        </Button>
      </div>
    </div>
  );
}
