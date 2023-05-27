import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { updateProduct } from "../../slices/photoSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product && product._id === id) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product, id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: id,
      name: name,
      price: price,
    };

    dispatch(updateProduct(updatedProduct));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Editar Produto</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleUpdate}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditProduct;

// import { uploads } from "../../utils/config";

// // Components
// import Message from "../../components/Message";
// import { Link } from "react-router-dom";
// import { BsPencilFill, BsXLg } from "react-icons/bs";
// import EditModal from "../../components/EditModal";

// // Hooks
// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";

// // Redux
// import {
//   resetMessage,
//   getUserProducts,
//   updateProduct,
// } from "../../slices/photoSlice";

// const EditProduct = () => {
//   const { id } = useParams(); // id do produto na url

//   const dispatch = useDispatch();

//   // Pegando usuário atenticado e usuário que entrou no perfil dele
//   // Usuário que entrou no perfil dele
//   const { user, loading } = useSelector((state) => state.user);
//   // Usuário autenticado // Renomenado pois colidem
//   const { user: userAuth } = useSelector((state) => state.auth); // Token
//   const {
//     product,
//     loading: loadingProduct,
//     message: messageProduct,
//     error: errorProduct,
//   } = useSelector((state) => state.product);

//   const [name, setName] = useState("");
//   const [images, setImages] = useState("");
//   const [editId, setEditId] = useState("");

//   const editProductForm = useRef();

//   const EditProduct = (product) => {
//     setEditId(product._id)
//     setName(product.name)
//     // setImages(product.images)
//   }
//    // Atualizando produto
//    const handleUpdate = (e) => {
//     e.preventDefault();

//     const productData = {
//       name: name,
//       id: editId,
//     };

//     dispatch(updateProduct(productData));

//     resetComponentMessage();
//   };

//   const resetComponentMessage = () => {
//     setTimeout(() => {
//       dispatch(resetMessage());
//     }, 2000);
//   };

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <div>
//       {user._id === userAuth._id && (
//         <>
//           <div className="edit-photo" ref={editProductForm}>
//             <p>Editando</p>

//             {/* {images && (
//               <img src={`${uploads}/products/${images[0].filename}`} alt={name} />
//             )} */}

//             <form onSubmit={handleUpdate}>
//               <input
//                 type="text"
//                 placeholder="Nome"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name || ""}
//               />
//             </form>
//             <input type="submit" value="Enviar" onClick={}/>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default EditProduct;
