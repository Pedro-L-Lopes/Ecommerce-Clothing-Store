// Components
import ProductItemBox from "../../../components/ProductItemBox/ProductItemBox";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import ReactPaginate from "react-paginate";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllProducts } from "../../../slices/productSlice";
import { addCart } from "../../../slices/cartSlice";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.product);

  // Variáveis para controle da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15; // Número de itens por página

  // Carregando todos os produtos
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  // Função para exibir os produtos da página atual
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

  // Função para atualizar a página atual ao clicar na paginação
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <main>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {renderProducts()}
      </div>
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
    </main>
  );
};

export default AllProducts;
