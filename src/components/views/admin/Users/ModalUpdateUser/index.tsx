import Button from "@/components/ui/Button";
import Anput from "@/components/ui/Anput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/user.type";
import { AnyTxtRecord } from "dns";

type Protypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalUpdateUser = (props: Protypes) => {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster, session } =
    props;
  // const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const data = {
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
    };

    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "success updated",
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
    <Modal onClose={() => setUpdatedUser({})}>
      <h3>Update User</h3>
      <form onSubmit={handleUpdateUser}>
        <hr />
        <Anput
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
        />
        <Anput
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
        />
        <Anput
          label="Phone Number"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
            { label: "Teroris", value: "teroris" },
            { label: "Penyamun", value: "penyamun" },
            { label: "Biksu", value: "biksu" },
            { label: "Ahli Taurat", value: "ahli taurat" },
          ]}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
