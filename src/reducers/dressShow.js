import Action from "../actions";


var initialState = {
    value:{design:-1,type:-1,texture:-1,color:-1},
    dress: [],
  };

  function dressReducer(state = initialState, action) {;
  switch (action.type) {
    case Action.UPDATE:
        console.log("update"+action.data.dress)
        return{
              dress:action.data.dress,
              value:action.data.value
          }
    //   console.log("return")
      
    default:
      return state;
  }
}

export default dressReducer;
