"use strict";
// AJAX = Asynchronous Javascript & XML (Strict HTML)
// Asynchronous means "wait for a process that takes time before going next step."

//  Async with Promises and .then/.catch
let inStock = true;
const makeMeDessert = () => {
  console.log("Please make me a dessert."); //  initial render
  console.log("[w]Please wait. I'll be back. *goes to kitchen*"); //  server request
  let myDessert;
  prepareDessert()
    .then((resolvedData) => {
      //  do this when we get promise resolve's data
      myDessert = resolvedData;
      console.log("Yay, I got ", myDessert);
    })
    .catch((err) => {
      //  do this when promise failed or .then block threw an exception
      console.error("An error occurred.");
      myDessert = "NO dessert";
      console.log("Yay, I got ", myDessert);
    });
};

//  Async with Await and Try/Catch
const makeMeDessertWithAwait = async () => {
  console.log("Please make me a dessert.");
  console.log("[w]Please wait. I'll be back. *goes to kitchen*");
  try {
    //  try the whole block of code
    let myDessert = await prepareDessert();
    console.log("Yay, I got ", myDessert);
  } catch (err) {
    // do this when try block throws an exception
    console.error(err);
    let myDessert = "NO dessert";
    console.log("I got nothing.");
  }
};

//  A Promise Constructing Function
const prepareDessert = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //  condition ? ifTrueStatement : ifFalseStatement ;  Ternery Operator
      inStock ? resolve("Pudding") : reject(new Error("NO dessert"));
    }, 5000);
  });
};

// ################# Server Request Example ###################

// Fetch with Await
const fetchDataWithAwait = async () => {
  console.log("Request something to server.");
  console.log("Loading");
  try {
    // Server error responses are not EXCEPTIONS. They are Unchecked Errors. (404,403 etc)
    let myHeader = new Headers();
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "GET", //  GET, POST, PUT, DELETE
      header: myHeader,
      //   body: (json string),
    });
    // NOTE! Throw exceptions MANUALLY to handle and catch server errors.
    if (!response.ok) throw new Error("Server Error Occurred.");
    let data = await response.json();
    console.log(data);
    renderTheData(data);
  } catch (err) {
    console.log("CATCH BLOCKED EXECUTED!");
    console.error(err);
  }
};

// Fetch with Promise
const fetchData = () => {
  console.log("Request something to server.");
  console.log("Loading");

  fetch("https://jsonplaceholder.typicode.com/posts/-1")
    .then((response) => {
      // receives resolve value from the promise
      if (!response.ok) throw new Error("Server Error");
      return response.json();
    })
    .then((_data) => {
      // receives return value from previous .then block
      console.log(_data);
      renderTheData(_data);
    })
    .catch((err) => {
      // do this when fetch fails or ANY .then throws an exception
      console.log("Catch");
      console.error(err);
    });
};

// DOM manipulating function
const renderTheData = (_data) => {
  let myEle = document.createElement("p"); // <p></p>
  myEle.textContent = JSON.stringify(_data); //  <p>(_data)</p>
  myEle.classList.add("text-primary"); // <p class="text-primary">(_data)</p>
  document.body.appendChild(myEle);
  // <body>
  // ...
  // <p class="text-primary">(_data)</p>
  // </body>
};

// REST API - representational state transfer (JSON transfer)

// ! Be Aware Of These
// Fetch API returns Promise objects
// Server responses cannot be rendered or read in browser directly, must parse with .json()
// JSON objects cannot be rendered in browser directly, use JSON.stringify()
// CATCH only detects EXCEPTIONS or Checked Errors.

// * Summary
// 1. What is Async? Promise(resolve, reject) / Await
// 2. FetchAPI (XMLHttpRequest) || Library -> Axios
// 3. Exception VS Unchecked Error  (...no_internet_connection error is an exception)
// 4. response.json()
// 5. AJAX
// 6. FetchAPI Verbs? PUT, DELETE, POST, GET
// 7. Manual Exception Throw? if (!res.ok) throw new Error("error message")
// 8. How To Create A Promise
