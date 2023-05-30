import "./Search.css";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "../../../hooks/useQuery";

// Components
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";

// Redux
import { searchProducts } from "../../../slices/productSlice";

const Search = () => {
  const query = useQuery();

  const search = query.get("q");

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  // Carregando produtos
  useEffect(() => {
    dispatch(searchProducts(search));
  }, [dispatch, search]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      Resultado para: {search}
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
      {products && products.length === 0 && (
        <h2>Não foram econtrados resultado para sua busca.</h2>
      )}
    </div>
  );
};

export default Search;
