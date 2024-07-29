import ProductsAdminView from "@/components/views/admin/Products";
import userServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminProductsPage = ({ setToaster }: any) => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await userServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <ProductsAdminView products={products} setToaster={setToaster} />
    </>
  );
};

export default AdminProductsPage;
