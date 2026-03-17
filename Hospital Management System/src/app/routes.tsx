import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Patients } from "./components/Patients";
import { Doctors } from "./components/Doctors";
import { Wards } from "./components/Wards";
import { Beds } from "./components/Beds";
import { PatientDoctor } from "./components/PatientDoctor";
import { WardBeds } from "./components/WardBeds";
import { Staff } from "./components/Staff";
import { StaffAllocation } from "./components/StaffAllocation";
import { NextOfKin } from "./components/NextOfKin";
import { LocalDoctors } from "./components/LocalDoctors";
import { WaitingList } from "./components/WaitingList";
import { Appointments } from "./components/Appointments";
import { Medications } from "./components/Medications";
import { Supplies } from "./components/Supplies";
import { Suppliers } from "./components/Suppliers";
import { Reports } from "./components/Reports";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "patients", Component: Patients },
      { path: "doctors", Component: Doctors },
      { path: "staff", Component: Staff },
      { path: "staff-allocation", Component: StaffAllocation },
      { path: "wards", Component: Wards },
      { path: "beds", Component: Beds },
      { path: "patient-doctor", Component: PatientDoctor },
      { path: "ward-beds", Component: WardBeds },
      { path: "next-of-kin", Component: NextOfKin },
      { path: "local-doctors", Component: LocalDoctors },
      { path: "waiting-list", Component: WaitingList },
      { path: "appointments", Component: Appointments },
      { path: "medications", Component: Medications },
      { path: "supplies", Component: Supplies },
      { path: "suppliers", Component: Suppliers },
      { path: "reports", Component: Reports },
      { path: "*", Component: NotFound },
    ],
  },
]);