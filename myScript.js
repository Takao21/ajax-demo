"use strict";

//  Async with Promises
let inStock = true;
const makeMeDessert = () => {
  console.log("Please make me a dessert."); //  initial render
  console.log("[w]Please wait. I'll be back. *goes to kitchen*"); //  server request
  let myDessert;
  prepareDessert()
    .then((resolvedData) => {
      //  server response
      myDessert = resolvedData;
      console.log("Yay, I got ", myDessert);
    })
    .catch((err) => {
      //  server fail
      console.error("An error occurred.");
      myDessert = "NO dessert";
      console.log("Yay, I got ", myDessert);
    });
};

// AJAX = Asynchronous Javascript & XML (Strict HTML)

const makeMeDessertWithAwait = async () => {
  // Async function
  console.log("Please make me a dessert.");
  console.log("[w]Please wait. I'll be back. *goes to kitchen*");

  try {
    let myDessert = await prepareDessert();
    console.log("Yay, I got ", myDessert);
  } catch (err) {
    console.error(err);
    let myDessert = "NO dessert";
    console.log("I got nothing.");
  }
};

const prepareDessert = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //  condition ? ifTrueStatement : ifFalseStatement ;
      inStock ? resolve("Pudding") : reject(new Error("NO dessert"));
    }, 5000);
  });
};

// ####################################
// Exception VS Unchecked Error
const fetchDataWithAwait = async () => {
  console.log("Request something to server.");
  console.log("Loading");
  // fetch API
  try {
    // Server error responses are not EXCEPTIONS. They are unchecked error.
    let myHeader = new Headers();
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/9", {
      method: "DELETE", // UPDATE=PUT
      header: myHeader,
    });
    // Please throw manual exceptions for server errors.
    if (!response.ok) throw new Error("Server Error Occurred.");
    let data = await response.json();
    console.log(data);
    renderTheData(data);
  } catch (err) {
    console.log("CATCH BLOCKED EXECUTED!");
    console.error(err);
  }
};

const fetchData = () => {
  console.log("Request something to server.");
  console.log("Loading");

  fetch("https://jsonplaceholder.typicode.com/posts/-1")
    .then((response) => {
      if (!response.ok) throw new Error("Server Error");
      return response.json();
    })
    .then((_data) => {
      console.log(_data);
      renderTheData();
    })
    .catch((err) => {
      console.log("Catch");
      console.error(err);
    });
};

const renderTheData = (_data) => {
  let myEle = document.createElement("p");
  myEle.textContent = JSON.stringify(_data);
  myEle.classList.add("text-primary");
  document.body.appendChild(myEle);
};

// REST API - representational state transfer
// Fetch API returns Promise objects
// POST, PUT, GET, DELETE

// Summary ***
// 1. What is Async? Promise(resolve, reject) / Await
// 2. FetchAPI (XMLHttpRequest) Axios
// 3. Exception VS Unchecked Error  (...no_internet_connection)
// 4. response.json()
// 5. AJAX
// 6. FetchAPI Verbs? PUT, DELETE, POST, GET
// 7. Manual Exception Throw? if (!res.ok) throw new Error("")
// 8. How To Create Promise
