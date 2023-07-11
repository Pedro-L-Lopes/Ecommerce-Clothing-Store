import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "../../../hooks/useQuery";
import { Link } from "react-router-dom";
import { searchProducts } from "../../../slices/productSlice";
import ReactPaginate from "react-paginate";

import "./Search.css";
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(searchProducts(search));
  }, [dispatch, search]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderProducts = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
      products &&
      products.slice(startIndex, endIndex).map((product) => (
        <div key={product._id}>
          <Link to={`/products/${product._id}`}>
            <ProductItemBox product={product} />
          </Link>
        </div>
      ))
    );
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Resultado para: {search}</h2>
      <div id="products-container-box">{renderProducts()}</div>
      {products && products.length === 0 && (
        <h2>Não foram encontrados resultados para a sua busca.</h2>
      )}
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        pageCount={Math.ceil(products.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Search;
