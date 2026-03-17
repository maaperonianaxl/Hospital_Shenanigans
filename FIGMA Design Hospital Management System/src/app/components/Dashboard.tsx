import { Users, UserCog, Building2, Bed, Calendar, Activity } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      link: "/patients",
    },
    {
      title: "Total Doctors",
      value: "87",
      icon: UserCog,
      color: "bg-green-500",
      link: "/doctors",
    },
    {
      title: "Total Wards",
      value: "12",
      icon: Building2,
      color: "bg-purple-500",
      link: "/wards",
    },
    {
      title: "Available Beds",
      value: "156",
      icon: Bed,
      color: "bg-orange-500",
      link: "/beds",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "admission",
      message: "New patient admitted: John Doe",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "discharge",
      message: "Patient discharged: Jane Smith",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "appointment",
      message: "Appointment scheduled for Robert Brown",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "ward",
      message: "Ward 3A cleaning completed",
      time: "3 hours ago",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Johnson",
      doctor: "Dr. Sarah Williams",
      time: "10:00 AM",
      date: "Today",
    },
    {
      id: 2,
      patient: "Michael Chen",
      doctor: "Dr. James Taylor",
      time: "11:30 AM",
      date: "Today",
    },
    {
      id: 3,
      patient: "Emily Davis",
      doctor: "Dr. Maria Garcia",
      time: "2:00 PM",
      date: "Today",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome to Wellmeadows Hospital Management System</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg">Recent Activities</h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg">Upcoming Appointments</h3>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">{appointment.patient}</p>
                    <p className="text-xs text-gray-600 mt-1">with {appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
