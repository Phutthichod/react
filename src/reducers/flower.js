import Action from "../actions";

const init = () => {
  if (localStorage.getItem("flower"))
    return JSON.parse(localStorage.getItem("flower"));
  else return [];
};
var initialState = {
  flower: init(),
};

function flowerReducer(state = initialState, action) {
  const newFlower = state.flower;
  switch (action.type) {
    case Action.DELETE_FLOWER:
      let flower = newFlower.filter((item) => item.id !== action.flower.id);
      localStorage.setItem("flower", JSON.stringify(flower));
      return {
        flower,
      };
    case Action.ADD_FLOWER:
      console.log(newFlower);
      const index = newFlower.findIndex((item) => item.id === action.flower.id);
      console.log(index);
      if (index !== -1) {
        newFlower[index].number += action.flower.number;
      } else {
        newFlower.push(action.flower);
        console.log(newFlower);
      }
      localStorage.setItem("flower", JSON.stringify(newFlower));
      return {
        flower: newFlower,
      };
    case Action.DELETE_ALL_FLOWER:
      return {
        flower: [],
      };
    default:
      return state;
  }
}

export default flowerReducer;
