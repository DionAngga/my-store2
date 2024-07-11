import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  session: any;
  usersPerPage: any;
  usersLength: any;
};

const ModalDeleteUser = (props: PropTypes) => {
  const {
    deletedUser,
    setDeletedUser,
    setUsersData,
    session,
    setToaster,
    usersPerPage,
  } = props;
  // const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data.accessToken
    );
    if (result.status === 200) {
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "success deleted!!",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "fail updated",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>
        Are you sure you want to delete this user?
      </h1>
      <Button
        type="button"
        onClick={() => {
          handleDelete();
          // router.refresh();
        }}
      >
        yes, sure!!
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
