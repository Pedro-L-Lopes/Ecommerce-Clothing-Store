import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../slices/productSlice";
import ReactPaginate from "react-paginate";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";

const MemoizedProductItemBox = React.memo(ProductItemBox);

const AllProducts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="flex mt-10">
        <ProductFilter
          categoryFilter={categoryFilter}
          promotionFilter={promotionFilter}
          onCategoryChange={handleCategoryFilterChange}
          onPromotionChange={handlePromotionFilterChange}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <div key={product._id}>
              <Link to={`/products/${product._id}`}>
                <MemoizedProductItemBox product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          className="flex mt-10 p-2"
          previousClassName="text-white bg-black rounded p-2 mt-2 mr-2"
          nextClassName="text-white bg-black rounded p-2 mt-2 ml-2"
          pageClassName="text-white bg-black rounded p-2 mt-2 ml-1"
          activeLinkClassName="p-2 font-bold"
        />
      </div>
      <Footer />
    </main>
  );
};

export default AllProducts;
