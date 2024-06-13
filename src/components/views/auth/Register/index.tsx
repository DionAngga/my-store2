import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Anput from "@/components/ui/Anput";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  // const app = express();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
      role: form.letter.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("ngga boleh pake email yang sama cuy");
    }
  };
  return (
    <AuthLayout
      title="Register"
      error={error}
      link="/auth/login"
      linkText="sudah punya akun? "
    >
      <form onSubmit={handleSubmit}>
        <Anput label="Email" name="email" type="email" />
        <Anput label="fullname" name="fullname" type="fullname" />
        <Anput label="phone" name="phone" type="number" />
        <Anput label="letter" name="letter" type="text" />
        <Anput label="Password" name="password" type="password" />
        <Button
          type="submit"
          variant="warning"
          className={styles.register__button}
        >
          {isLoading ? "tunggu besad entar.." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
