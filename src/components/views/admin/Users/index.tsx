import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";
import Modal from "@/components/ui/Modal";
import ModalUpdateUser from "./ModalUpdateUser";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeletedUser";

type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  role: string;
};

type PropTypes = {
  users: User[];
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getTotalPage, setgetTotalPage] = useState(1);
  const [getstartIndex, setstartIndex] = useState(1);
  const [getCurrentUser, setGetCurrentUser] = useState<User[]>([]);
  const usersPerPage = 9;

  // Calculate the total number of pages
  //const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    setgetTotalPage(totalPages);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = usersData.slice(startIndex, startIndex + usersPerPage);
    setGetCurrentUser(currentUsers);
    setstartIndex(startIndex);
  }, [users, currentPage, usersPerPage, usersData, getCurrentUser]);
  // Get the users for the current page

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentUser.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td>{getstartIndex + index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button
                        className={styles.users__table__action__edit}
                        type="button"
                        onClick={() => {
                          setUpdatedUser(user);
                        }}
                      >
                        <i className="bx bx-edit" />
                      </Button>
                      <Button
                        className={styles.users__table__action__delete}
                        type="button"
                        onClick={() => {
                          setDeletedUser(user);
                        }}
                      >
                        <i className="bx bxs-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length > usersPerPage && (
            <div className={styles.pagination}>
              <Button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={styles.users__table__action}
                disabled={currentPage === 1}
              >
                <i className="bx bx-chevrons-left" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, getTotalPage))
                }
                className={styles.users__table__action}
                disabled={currentPage === getTotalPage}
              >
                <i className="bx bx-chevrons-right" />
              </Button>

              <span>
                Page {currentPage} of {getTotalPage}
              </span>
            </div>
          )}
        </div>
      </AdminLayout>
      {Object?.keys(updatedUser || {})?.length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object?.keys(deletedUser || {})?.length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
          usersPerPage={usersPerPage}
          usersLength={users.length}
        />
      )}
    </>
  );
};

export default UsersAdminView;
