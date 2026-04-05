import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logout } from "../features/auth/authSlice";

const useLogoutHandler = () => {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutApi().unwrap();

      return { success: true, data: res };
    } catch (error) {
      return { success: false, error };
    } finally {
      dispatch(logout());
    }
  };

  return { handleLogout };
};

export default useLogoutHandler;
