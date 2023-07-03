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
      <div className="flex justify-center w-full">
        <img
          src={banner2}
          alt="Banner promoção"
          style={{ maxHeight: "80vh", width: "100%" }}
          className="object-cover object-top rounded"
        />
      </div>

      <div>
        <CategoryCard />
      </div>

      <h2>Em promoção</h2>
      <div className="flex">
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

      {/* <h2>Ultimas novidades</h2>
      <div className="">
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
      </div> */}
    </main>
  );
};

export default Home;
