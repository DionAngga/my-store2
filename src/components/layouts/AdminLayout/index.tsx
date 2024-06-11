import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSideBarItem = [
  { title: "Dashboard", url: "/admin", icon: "bxs-dashboard" },
  { title: "Products", url: "/admin/products", icon: "bx bx-box warning" },
  { title: "Users", url: "/admin/users", icon: "bxs-user" },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSideBarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
