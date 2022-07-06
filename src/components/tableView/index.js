import { deleteProductByID } from "../../services/api";
import "./style.css";

function TableView(props) {
  const { productList, editProduct } = props;

  const renderTableBody = () => {
    const keys = getColumnNames();
    return productList.map((row, index) => (
      <tr key={index}>{renderRows(row, keys, index)}</tr>
    ));
  };

  const getActionButtons = (productId) => {
    return (
      <div key={productId}>
        <button
          className="btn-action"
          onClick={() => editSelectedProduct(productId)}
        >
          <span>Edit</span>
        </button>
        <button
          className="btn-action"
          onClick={() => deleteSelectedProduct(productId)}
        >
          <span>Delete</span>
        </button>
      </div>
    );
  };

  const editSelectedProduct = (productId) => {
    editProduct(productId);
  };
  const deleteSelectedProduct = (productId) => {
    deleteProductByID(productId).then(() => window.location.reload(false));
  };

  const renderRows = (row, keys, rowId) =>
    keys.map((eachKey) => (
      <td key={`${eachKey}${rowId}`} title={row[eachKey]}>
        {eachKey === "ACTIONS"
          ? getActionButtons(row["productId"])
          : eachKey === "createDate"
          ? new Date(row[eachKey]).toDateString()
          : row[eachKey]}
      </td>
    ));

  const getColumnNames = () => {
    let columns =
      productList && productList[0] ? Object.keys(productList[0]) : [];
    columns = columns.concat("ACTIONS");
    return columns;
  };

  //render the header for the table
  const renderTableHeader = () => {
    const tableHeader = getColumnNames();
    return tableHeader.map((eachHeader) => (
      <th key={eachHeader}>{eachHeader.toUpperCase()}</th>
    ));
  };

  return (
    <table className="inShare-table">
      <thead>
        <tr>{renderTableHeader()}</tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </table>
  );
}

export default TableView;
