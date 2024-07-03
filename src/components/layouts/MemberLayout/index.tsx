import Sidebar from "@/components/fragments/Sidebar";
import styles from "./MemberLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSideBarItem = [
  { title: "Dashboard", url: "/member", icon: "bx bxs-dashboard" },
  { title: "Orders", url: "/member/orders", icon: "bx bxs-cart" },
  { title: "Profile", url: "/member/profile", icon: "bx bxs-user" },
];

const MemberLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listSideBarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
