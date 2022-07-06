import Header from "../header";
import "./style.css";
import { useEffect, useState } from "react";
import Modal from "../modal";
import { getProductByID, getProducts, heartBeat } from "../../services/api";
import ProductActions from "../productActions";
import TableView from "../tableView";

function Home() {
  const [productList, setProductList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("ADD");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts().then((response) =>
      setProductList(
        response.products.sort(
          (obj1, obj2) => new Date(obj1.createDate) - new Date(obj2.createDate)
        )
      )
    );
  }, []);

  const editAction = (productId) => {
    getProductByID(productId).then((res) => {
      setActionType("EDIT");
      setIsOpen(true);
      setSelectedProduct(res);
    });
  };

  const heartBeatTrigger = () => {
    heartBeat().then((res) => alert("HeartBeat: " + res));
  };

  return (
    <div>
      <Header />
      <div className="productContainer">
        <div className="buttonContainer">
          <button
            title={"Add new product"}
            className="btn"
            onClick={() => setIsOpen(true)}
          >
            <span>Add new product</span>
          </button>
          <button
            title={"Check api"}
            className="btn"
            onClick={() => heartBeatTrigger()}
          >
            <span>Heart Beat</span>
          </button>
        </div>

        <TableView productList={productList} editProduct={editAction} />
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} headerName={"Add new product"}>
          <ProductActions
            actionType={actionType}
            selectedProduct={selectedProduct}
          />
        </Modal>
      )}
    </div>
  );
}

export default Home;
