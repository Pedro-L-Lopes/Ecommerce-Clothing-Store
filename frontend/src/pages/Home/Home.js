import "./Home.css";

// Components
import ProductItemBox from "../../components/ProductItemBox";
import ProductItem from "../../components/ProductItem";
import { Link } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllProducts } from "../../slices/photoSlice";

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
    <div>
      <h2>Ultimas novidades</h2>
      <div id="products-container-box">
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <Link to={`/products/${product._id}`}>
                <ProductItemBox product={product} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
