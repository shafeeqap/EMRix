import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "./features/auth/authApiSlice";
import { useEffect } from "react";
import { setCredentials } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await refreshToken().unwrap();

        dispatch(
          setCredentials({
            user: res.user,
            accessToken: res.accessToken,
          })
        );
      } catch (error) {
        console.log("No active session", error);
      }
    };

    refreshUser();
  }, [dispatch, refreshToken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
