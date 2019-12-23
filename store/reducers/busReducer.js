import { SET_CATEGORY } from "../actions/busActions";
import { SET_BUSES, UPDATE_BUS_STATUS } from "../actions/busActions";

const initialState = {
  availableBuses: [],
  workBuses: [],
  currentCategories: []
};

// const initialState = {
//   availableProducts: MDATA,
//   userProducts: MDATA //PRODUCTS.filter(prod => prod.ownerId === 'u1')
// };

const busReducer = (state = initialState, action) => {
  //console.log("in reducer data is", action.type);
  let allbuses = [];
  let workary = [];
  let workobj = {};
  let tary = [];
  let tobj = {};
  let tval = null;
  switch (action.type) {
    case SET_CATEGORY:
      allbuses = action.payload;
      cnt = 0;
      allmimes.forEach(element => {
        tval = element.cat1;
        if (tary.indexOf(tval) < 0) {
          tary.push(tval);
        }
      });
      return {
        ...state,
        availableMimes: action.payload,
        currentCategories: tary,
        workMimes: action.payload
        // availableMimes: state.availableMimes.filter(
        //   prod => prod.ownerId === "u1"
        // )
      };

    case UPDATE_BUS_STATUS:
      workobj = action.payload;
      workary = state.availableBuses;
      let astatus = workobj.status;
      // console.log("in reducer update status is", astatus);
      // let aupstatus = 0;
      // if (astatus == 0) {
      //   aupstatus = 1;
      // }

      workary.forEach(element => {
        if (element._id === workobj._id) {
          element.status = astatus;
          // console.log(
          //   "in reducer we have a match so update status is",
          //   astatus
          // );
        }
      });
      return {
        ...state,
        availableBuses: workary
      };

    case SET_BUSES:
      //console.log("SET BUSES", action.payload);
      //allmimes = action.payload;

      return {
        ...state,
        availableBuses: action.payload,
        workBuses: action.payload
      };

    //return state;
    default:
      return state;
  }
};

// export default (state = initialState, action) => {
//   return state;
// };

export default busReducer;
