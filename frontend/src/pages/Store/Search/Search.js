import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "../../../hooks/useQuery";
import { Link } from "react-router-dom";
import { searchProducts } from "../../../slices/productSlice";
import ReactPaginate from "react-paginate";

import "./Search.css";
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [categoryFilter, setCategoryFilter] = useState("");
  const [promotionFilter, setPromotionFilter] = useState("");

  useEffect(() => {
    dispatch(searchProducts(search));
  }, [dispatch, search]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(0);
  };

  const handlePromotionFilterChange = (promotion) => {
    setPromotionFilter(promotion);
    setCurrentPage(0);
  };

  const filteredProducts = products.filter((product) => {
    let isCategoryMatch = true;
    let isPromotionMatch = true;

    if (categoryFilter) {
      isCategoryMatch = product.category === categoryFilter;
    }

    if (promotionFilter === "true") {
      isPromotionMatch = product.onSale;
    } else if (promotionFilter === "false") {
      isPromotionMatch = !product.onSale;
    }

    return isCategoryMatch && isPromotionMatch;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  const renderProducts = () => {
    return (
      displayedProducts &&
      displayedProducts.map((product) => (
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
      <ProductFilter
        categoryFilter={categoryFilter}
        promotionFilter={promotionFilter}
        onCategoryChange={handleCategoryFilterChange}
        onPromotionChange={handlePromotionFilterChange}
      />
      <h2>Resultado para: {search}</h2>
      <div id="products-container-box">{renderProducts()}</div>
      {products && products.length === 0 && (
        <h2>Não foram encontrados resultados para a sua busca.</h2>
      )}
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
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
