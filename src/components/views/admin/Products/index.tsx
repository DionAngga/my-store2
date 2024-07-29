import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  // Get the users for the current page

  useEffect(() => {}, []);

  return (
    <>
      <AdminLayout>
        <div className={styles.Products}>
          <h1>Product Management</h1>
          <table className={styles.Products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%" }}
                      />
                    </td>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      {product.name}
                    </td>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      {product.category}
                    </td>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      {convertIDR(product.price)}
                    </td>
                    <td className={styles.Products__table__grey}>41</td>
                    <td className={styles.Products__table__grey}>2</td>
                    <td
                      className={styles.Products__table__grey}
                      rowSpan={product.stock.length}
                    >
                      <div className={styles.Products__table__action}>
                        <Button
                          className={styles.Products__table__action__edit}
                          type="button"
                          onClick={() => {}}
                        >
                          <i className="bx bx-edit" />
                        </Button>
                        <Button
                          className={styles.Products__table__action__delete}
                          type="button"
                          onClick={() => {}}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (
                      stock: {
                        size: string;
                        qty: number;
                      },
                      index: number
                    ) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td className={styles.Products__table__grey}>
                              {stock.size}
                            </td>
                            <td className={styles.Products__table__grey}>
                              {stock.qty}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div></div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
