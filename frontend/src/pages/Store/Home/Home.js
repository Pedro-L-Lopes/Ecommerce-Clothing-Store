import styles from "./Home.module.css";

// Components
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllProducts } from "../../../slices/productSlice";

// Imagens
import banner2 from "../../../images/banner2.jpg";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.product);

  // Carregando todos os produtos
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <main>
      <div className="flex justify-center w-full mt-4">
        <img
          src={banner2}
          alt="Banner promoção"
          style={{ maxHeight: "80vh", width: "100%" }}
          className="object-cover object-top rounded"
        />
      </div>

      <div className="">
        <CategoryCard />
      </div>

      <h2 className="text-xl text-white bg-black inline p-2 rounded">
        Em promoção
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products &&
          products
            .filter((product) => product.available && product.onSale)
            .map((product) => (
              <div key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <ProductItemBox product={product} />
                </Link>
              </div>
            ))}
      </div>

      <div className="flex items-center justify-center mt-14 gap-2">
        <div>
          <img src={banner2} alt="" />
        </div>  
        <div>
          <img src={banner2} alt="" />
        </div>
      </div>

      <h2 className="text-xl mt-12 -mb-8">Lançamentos</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
        {products &&
          products
            .filter((product) => product.available && !product.onSale)
            .map((product) => (
              <div key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <ProductItemBox product={product} />
                </Link>
              </div>
            ))}
      </div>
    </main>
  );
};

export default Home;
