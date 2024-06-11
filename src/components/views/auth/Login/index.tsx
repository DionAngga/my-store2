import Link from "next/link";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Anput from "@/components/ui/Anput";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = () => {
  // const app = express();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query?.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("salah input email atau password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("error jir. coba cek koneksi internet atau tidur aja");
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Belum punya akun?"
    >
      <form onSubmit={handleSubmit}>
        <Anput label="Email" name="email" type="email" />
        <Anput label="Password" name="password" type="password" />
        <Button
          type="submit"
          variant="warning"
          className={styles.login__button}
        >
          {isLoading ? "tunggu bentar.." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__divider} />
      <div className={styles.login__other}>
        <Button
          type="submit"
          variant="warning"
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000" })
          }
          className={styles.login__button}
        >
          <i className="bx bxl-google" />
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
