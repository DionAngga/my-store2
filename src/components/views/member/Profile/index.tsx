import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Anput from "@/components/ui/Anput";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services/user";

const ProfileMemberView = ({ profile, setProfile, session }: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [pick, setPick] = useState(false);
  const handleChangeProfilePicture = (e: any) => {
    console.log("bugikan1", profile.id);
    console.log("bugikan2", changeImage);
    console.log("bugikan3", session?.data);
    e.preventDefault();
    setIsLoading(true);
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            console.log(data);
            if (data.image) {
              console.log("data1", profile.id);
              console.log("data2", data);
              console.log("data3", session?.data);
              const result = await userServices.updateProfile(
                profile.id,
                data,
                session?.data?.accessToken
              );
              if (result.status === 200) {
                setIsLoading(false);
                setProfile({
                  ...profile,
                  image: newImageURL,
                });
                setChangeImage({});
                e.target[0].value = "";
              }
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
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
                console.log(e.currentTarget.files[0]);
                setChangeImage(e.currentTarget.files[0]);
              }}
            />

            <Button
              className={styles.profile__main__avatar__button}
              type="submit"
              disabled={!pick}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
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
            />
            <Anput
              label="Phone"
              type="phone"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Anput
              label="Password"
              type="password"
              name="password"
              defaultValue={profile.password}
            /> */}
            <Button type="submit" variant="warning">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
