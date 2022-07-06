//APIS
const BASE_URL = "https://challenge.inshare.com/rest/product/";
const HEARTBEAT = "https://challenge.inshare.com/rest/heartbeat";
const GET_PRODUCTS = "getProducts";
const GET_PRODUCT_BYID = "getProduct/";
const CREATE_PRODUCT = "createProduct";
const UPDATE_PRODUCT = "updateProduct";
const DELETE_PRODUCT = "deleteProduct/";

//Auth
const USER_NAME = "ramgopal711@gmail.com";
const PASSWORD = "inshare";

async function getProducts() {
  let response = await fetch(
    BASE_URL.concat(GET_PRODUCTS),
    getRequestData("GET")
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
  return response;
}

async function createProduct(productData) {
  let response = await fetch(
    BASE_URL.concat(CREATE_PRODUCT),
    getRequestData("POST", productData)
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
  return response;
}

async function deleteProductByID(productId) {
  let response = await fetch(
    BASE_URL.concat(DELETE_PRODUCT, productId),
    getRequestData("DELETE")
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
  return response;
}

async function getProductByID(productId) {
  let response = await fetch(
    BASE_URL.concat(GET_PRODUCT_BYID, productId),
    getRequestData("GET")
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
  return response;
}

async function editProductByID(productData) {
  let response = await fetch(
    BASE_URL.concat(UPDATE_PRODUCT),
    getRequestData("PUT", productData)
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => alert(err));
  return response;
}

async function heartBeat() {
  let response = await fetch(HEARTBEAT, getRequestData("GET", "", "text/plain"))
    .then((data) => data.statusText)
    .catch((err) => alert(err));
  return response;
}

//build request data
function getRequestData(method, data, contentType = "application/json") {
  let headers = new Headers();
  let reqData = {};
  headers.set("Authorization", "Basic " + btoa(USER_NAME + ":" + PASSWORD));
  headers.set("Content-Type", contentType);
  switch (method) {
    case "PUT":
    case "POST":
      reqData = {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      };
      break;
    default:
      reqData = { method: method, headers: headers };
  }
  return reqData;
}
export {
  getProducts,
  createProduct,
  deleteProductByID,
  getProductByID,
  heartBeat,
  editProductByID,
};
