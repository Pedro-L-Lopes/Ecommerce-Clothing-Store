import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../slices/productSlice";
import ReactPaginate from "react-paginate";

import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const [categoryFilter, setCategoryFilter] = useState("");
  const [promotionFilter, setPromotionFilter] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
    return <p>Carregando</p>;
  }

  return (
    <main>
      <ProductFilter
        categoryFilter={categoryFilter}
        promotionFilter={promotionFilter}
        onCategoryChange={handleCategoryFilterChange}
        onPromotionChange={handlePromotionFilterChange}
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {renderProducts()}
      </div>
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
    </main>
  );
};

export default AllProducts;
