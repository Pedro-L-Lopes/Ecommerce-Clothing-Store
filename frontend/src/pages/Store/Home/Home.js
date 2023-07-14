// Components
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllProducts } from "../../../slices/productSlice";
import { addCart } from "../../../slices/cartSlice";

// Imagens
import destaque from "../../../images/destaque.jpg";
import banner2 from "../../../images/PROMOCAO.png";
import { PageColor } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.product);

  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [regularProducts, setRegularProducts] = useState([]);

  // Carregando todos os produtos
  useEffect(() => {
    dispatch(getAllProducts());
    PageColor("white");
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const onSale = products
        .filter((product) => product.available && product.onSale)
        .slice(0, 10);
      const regular = products
        .filter((product) => product.available && !product.onSale)
        .slice(0, 10);
      setOnSaleProducts(onSale);
      setRegularProducts(regular);
    }
  }, [products]);

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <main>
      <div className="flex justify-center w-full mt-4">
        <LazyLoad width={2000}>
          <img
            src={destaque}
            alt="Banner promoção"
            style={{ maxHeight: "60vh", width: "100%" }}
            className="object-cover object-top rounded"
          />
        </LazyLoad>
      </div>

      <div className="">
        <CategoryCard />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {onSaleProducts.map((product) => (
          <div key={product._id}>
            <Link to={`/products/${product._id}`}>
              <ProductItemBox product={product} />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-14 gap-2">
        <div>
          <LazyLoad>
            <img
              src={banner2}
              alt="banner de promoção"
              style={{ maxHeight: "60vh", width: "100%" }}
              className="object-cover object-top rounded"
            />
          </LazyLoad>
        </div>
        <div>
          <LazyLoad>
            <img
              src={banner2}
              alt="banner de promoção"
              style={{ maxHeight: "60vh", width: "100%" }}
              className="object-cover object-top rounded"
            />
          </LazyLoad>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {regularProducts.map((product) => (
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
