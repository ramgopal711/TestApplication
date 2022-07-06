import { useState } from "react";
import { createProduct, editProductByID } from "../../services/api";
import "./style.css";
export default function ProductActions(props) {
  const { actionType, selectedProduct } = props;
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  const [cost, setCost] = useState(
    selectedProduct ? selectedProduct.productCost : ""
  );

  const handleSubmit = (e) => {
    const postData = {
      productId: selectedProduct ? selectedProduct.productId : constructGUID(),
      name: name,
      description: description,
      productCost: cost,
      createDate: new Date().toISOString(),
    };

    if (actionType === "ADD") {
      createProduct(postData).then(() => window.location.reload(false));
    } else {
      editProductByID(postData).then(() => window.location.reload(false));
    }
    e.preventDefault();
  };

  const constructGUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        Name:
        <input
          value={name}
          className="inputField"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          value={description}
          className="inputField"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Cost:
        <input
          value={cost}
          className="inputField"
          type="text"
          onChange={(e) => setCost(e.target.value)}
        />
      </label>
      <input className="submitButton" type="submit" value="Submit" />
    </form>
  );
}
