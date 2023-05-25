import "./Home.css";

// Components
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
    <div id="home">

      <products className="products-container">
        {products &&
          products.map((product) => (
            <div key={product._id} className="product">
              <Link to={`/products/${product._id}`}>
                <ProductItem product={product} />
              </Link>
            </div>
          ))}
      </products>
    </div>
  );
};

export default Home;
