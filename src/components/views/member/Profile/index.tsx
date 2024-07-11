import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Anput from "@/components/ui/Anput";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  profile: User | any;
  setProfile: Dispatch<SetStateAction<any>>;
  session: any;
};

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: PropTypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");
  const [pick, setPick] = useState(false);

  const handleChangePassowrd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      if (data) {
        const result = await userServices.updateProfile(
          data,
          session?.data?.accessToken
        );
        if (result.status === 200) {
          setIsLoading("");
          form.reset();
          setToaster({
            variant: "success",
            message: "success updated",
          });
        }
        if (result.status === 400) {
          setIsLoading("");
          form.reset();
          setToaster({
            variant: "warning",
            message: "something wrong, try refresh",
          });
        }
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "wrong password cuk !",
      });
    }
  };

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      data,
      session?.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      setToaster({
        variant: "success",
        message: "success updated",
      });
      form.reset();
    } else {
      setToaster({
        variant: "warning",
        message: "something wrong, try refresh",
      });
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    setPick(false);
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            if (data.image) {
              const result = await userServices.updateProfile(
                data,
                session?.data?.accessToken
              );
              if (result.status === 200) {
                setIsLoading("");
                setProfile({
                  ...profile,
                  image: newImageURL,
                });
                setChangeImage({});
                form.reset();
                setToaster({
                  variant: "success",
                  message: "success updated",
                });
              } else {
                setToaster({
                  variant: "warning",
                  message: "something wrong, refresh if needed",
                });
                setIsLoading("");
                setChangeImage({});
              }
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "failed update",
            });
          }
        }
      );
    }
  };
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>profile page hacked</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          {profile.image ? (
            <Image
              className={styles.profile__main__avatar__image}
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
            />
          ) : (
            <div className={styles.profile__main__avatar__image}>
              {profile?.fullname?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture}>
            <label
              className={styles.profile__main__avatar__label}
              htmlFor="upload-image"
            >
              {changeImage?.name ? (
                <p>{changeImage?.name}</p>
              ) : (
                <>
                  <p>
                    Upload a new avatar, Larger image will be resized
                    automatically
                  </p>
                  <p>
                    *Maximum upload size is <b>1 MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              className={styles.profile__main__avatar__input}
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                setPick(true);
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />

            <Button
              className={styles.profile__main__avatar__button}
              type="submit"
              disabled={!pick}
            >
              {isLoading === "picture" ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <h2>Profile</h2>
          <form onSubmit={handleChangeProfile}>
            <Anput
              label="Fullname"
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Anput
              label="Email"
              type="Email"
              name="email"
              defaultValue={profile.email}
              disabled
            />
            <Anput
              label="Phone"
              type="phone"
              name="phone"
              defaultValue={profile.phone}
            />
            <Anput
              label="Role"
              type="text"
              name="role"
              defaultValue={profile.role}
              disabled
            />
            {/* <Anput
              label="Password"
              type="password"
              name="password"
              defaultValue={profile.password}
            /> */}
            <Button type="submit" variant="warning">
              {/* {isLoading === "profile" ? "Uploading..." : "Update Profile"} */}
              update
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__password}>
          <h2>Profile</h2>
          <form onSubmit={handleChangePassowrd}>
            <Anput
              label="Old Password"
              type="password"
              name="old-password"
              disabled={isLoading === "password" || profile.type === "google"}
              placeholder={
                profile.type === "google" ? "banned!" : "type new password"
              }
            />
            <Anput
              label="New Password"
              type="password"
              name="new-password"
              disabled={isLoading === "password" || profile.type === "google"}
              placeholder={
                profile.type === "google" ? "banned!" : "type new password"
              }
            />
            <Button
              type="submit"
              variant="warning"
              disabled={isLoading === "password" || profile.type === "google"}
            >
              {isLoading === "password" ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
