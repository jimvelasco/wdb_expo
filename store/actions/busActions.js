export const SET_CATEGORY = "SET_CATEGORY";
export const SET_BUSES = "SET_BUSES";
export const UPDATE_BUS_STATUS = "UPDATE_BUS_STATUS";

export const searchCategory = cat => {
  //'https://rn-complete-guide.firebaseio.com/products.json'
  //console.log("the searchMimesText term is", term);

  let url = "http://mimebase.herokuapp.com/restapi/category/" + cat; //joke";
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({ type: SET_CATEGORY, payload: resData });
    } catch (err) {
      throw err;
    }
  };
};
export const getBuses = () => {
  //'https://rn-complete-guide.firebaseio.com/products.json'
  //console.log("the searchMimesText term is", term);
  // console.log("we are getting buses from api");

  let url = "http://wheredabus.herokuapp.com/restapi/buses"; //joke";
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      // console.log(
      //   "we are got buses from api and dispatching to reducer",
      //   resData
      // );
      dispatch({ type: SET_BUSES, payload: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const updateBusStatus = (id, status, driver) => {
  let ustatus = 0;
  if (status === 0) ustatus = 1;
  //'https://rn-complete-guide.firebaseio.com/products.json'
  //console.log("the searchMimesText term is", term);
  // console.log(
  //   "we are updating buss status buses from api id,status,ustatus,driver",
  //   id,
  //   status,
  //   ustatus,
  //   driver
  // );
  //let url = "http://wheredabus.herokuapp.com/restapi/buses"; //joke";
  let url =
    "http://wheredabus.herokuapp.com/restapi/updatebusstatus/" +
    id +
    "/" +
    ustatus +
    "/" +
    driver;
  // console.log("the url to fetch is", url);
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      // console.log(
      //   "we are got buses from api and dispatching to reducer",
      //   resData
      // );
      dispatch({ type: UPDATE_BUS_STATUS, payload: resData });
    } catch (err) {
      throw err;
    }
  };
};
