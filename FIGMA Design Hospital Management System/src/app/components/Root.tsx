import { Outlet, Link, useLocation } from "react-router";
import { Activity, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Root() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Patients", path: "/patients" },
    { name: "Doctors", path: "/doctors" },
    { name: "Staff", path: "/staff" },
    { name: "Staff Allocation", path: "/staff-allocation" },
    { name: "Wards", path: "/wards" },
    { name: "Beds", path: "/beds" },
    { name: "Next of Kin", path: "/next-of-kin" },
    { name: "Local Doctors", path: "/local-doctors" },
    { name: "Waiting List", path: "/waiting-list" },
    { name: "Appointments", path: "/appointments" },
    { name: "Medications", path: "/medications" },
    { name: "Supplies", path: "/supplies" },
    { name: "Suppliers", path: "/suppliers" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-blue-600">Wellmeadows Hospital Management</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className={`flex gap-2 flex-wrap ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? location.pathname === "/" 
                : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded transition-colors text-sm ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}