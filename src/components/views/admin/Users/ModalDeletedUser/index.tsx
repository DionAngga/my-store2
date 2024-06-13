import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const router = useRouter();
  const session: any = useSession();
  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
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
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
