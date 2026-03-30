import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import { ToastContainer } from "react-toastify";
import useAuthRestore from "./hooks/useAuthRestore";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import Doctors from "./features/doctors/Doctors";
import Booking from "./features/appointments/Booking";
import Patients from "./features/patients/Patients";
import DashboardLayout from "./layouts/DashboardLayout";

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
