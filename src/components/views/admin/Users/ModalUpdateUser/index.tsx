import Button from "@/components/ui/Button";
import Anput from "@/components/ui/Anput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const session: any = useSession();
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
    } else {
      setIsLoading(false);
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
