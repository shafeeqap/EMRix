import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import { ToastContainer } from "react-toastify";
import useAuthRestore from "./hooks/useAuthRestore";
import Dashboard from "./pages/Dashboard";
import Booking from "./features/appointments/Booking";
import Patients from "./features/patients/Patients";
import DashboardLayout from "./layouts/DashboardLayout";
import Loader from "./components/ui/Loader";
import Doctors from "./features/dashboard/doctors/Doctors";
import Scheduler from "./features/appointments/Scheduler";

function App() {
  const isLoading = useAuthRestore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                element={<ProtectedRoute allowedRoles={["super_admin"]} />}
              >
                <Route path="/doctors" element={<Doctors />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["super_admin", "doctor", "receptionist"]}
                  />
                }
              >
                <Route path="/patient" element={<Patients />} />
                <Route path="/appointments" element={<Booking />} />
                <Route path="/shedules" element={<Scheduler />} />
              </Route>
            </Route>
          </Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
