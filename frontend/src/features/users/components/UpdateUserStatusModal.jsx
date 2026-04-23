import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
} from "../userApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { closeModal } from "../../../components/modal/modalSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/handleApiError";
import { OctagonAlert } from "lucide-react";

const UpdateUserStatusModal = () => {
  const { userId } = useSelector((state) => state.modal.modalProps || {});

  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const user = userData?.user;
  const status = !user?.isActive;

  const fullName = getFullName(user);

  const dispatch = useDispatch();

  const handleUpdateStatus = async () => {
    try {
      const res = await updateUserStatus({
        id: user._id,
        status,
      }).unwrap();

      toast.success(res.message || "User status updated successfully");
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">
      <OctagonAlert strokeWidth={1.25} size={72} className="text-red-600" />
      <h1 className="text-2xl">Are you sure?</h1>
      <p className="text-textSecondary text-center">
        Do you really want to update{" "}
        <span className="text-red-600">{fullName}'s</span> status? It will be{" "}
        {status ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-red-600">Inactive</span>
        )}{" "}
        after the update.
      </p>

      <div className="flex justify-between w-full gap-2 mt-5">
        <button
          onClick={() => dispatch(closeModal())}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateStatus}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateUserStatusModal;
