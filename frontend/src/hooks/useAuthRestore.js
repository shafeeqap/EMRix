import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const useAuthRestore = () => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const refreshUser = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await refreshToken().unwrap();

        if (res?.accessToken && res?.user) {
          dispatch(
            setCredentials({
              user: res.user,
              accessToken: res.accessToken,
            })
          );
        } else {
          console.warn("Refresh response missing accessToken or user");
        }
      } catch (error) {
        console.log("No active session", error);
      } finally {
        setIsLoading(false);
      }
    };

    refreshUser();
  }, [dispatch, refreshToken]);

  return isLoading;
};

export default useAuthRestore;
