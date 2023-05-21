import '../Profile/Profile.css'

const AddProduct = () => {
  return (
    <div>
        <h1>Adionar produtos</h1>

        {/* Verifica a loja e exibe o formulario de cadastro de produtos */}
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newProductForm}>
            <h3>Adicionar produto</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Nome:</span>
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name || ""}
                  required
                />
              </label>

              <label>
                <span>Fotos:</span>
                <input type="file" onChange={handleFile} multiple />
              </label>

              <label>
                <span>Preço:</span>
                <input
                  type="number"
                  step="0.01"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price || ""}
                />
              </label>

              <label>
                <span>Descrição:</span>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description || ""}
                ></textarea>
              </label>

              <label>
                <span>Tamanhos:</span>
                <label>
                  <input
                    type="checkbox"
                    value="PP"
                    checked={size.includes("PP")}
                    onChange={() => handleCheckboxClick("PP")}
                  />
                  PP
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="P"
                    checked={size.includes("P")}
                    onChange={() => handleCheckboxClick("P")}
                  />
                  P
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="M"
                    checked={size.includes("M")}
                    onChange={() => handleCheckboxClick("M")}
                  />
                  M
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="G"
                    checked={size.includes("G")}
                    onChange={() => handleCheckboxClick("G")}
                  />
                  G
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="GG"
                    checked={size.includes("GG")}
                    onChange={() => handleCheckboxClick("GG")}
                  />
                  GG
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="EXG"
                    checked={size.includes("EXG")}
                    onChange={() => handleCheckboxClick("EXG")}
                  />
                  EXG
                </label>
              </label>

              <label>
                <span>Status: </span>
                <input
                  type="radio"
                  value="true"
                  checked={available === true}
                  onChange={handleAvailableChange}
                />
                Disponível
              </label>

              <label>
                <input
                  type="radio"
                  value="false"
                  checked={available === false}
                  onChange={handleAvailableChange}
                />
                Indisponível
              </label>

              <label>
                <span>Em promoção: </span>
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                />
                Em promoção
              </label>

              {/* Verifica se o produto está em promoção e exibe o preço promocional */}
              {onSale === true ? (
                <label>
                  <span>Preço promocional:</span>
                  <input
                    type="number"
                    step="0.01"
                    onChange={(e) => setSalePrice(e.target.value)}
                    value={salePrice || ""}
                  />
                </label>
              ) : (
                <label>
                  <span>Preço promocional:</span>
                  <input type="number" disabled />
                </label>
              )}

              {!loadingProduct && <input type="submit" value="Adicionar" />}
              {loadingProduct && (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
    </div>
  )
}

export default AddProduct