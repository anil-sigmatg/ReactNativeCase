const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  let indx = -1;

  state.items.find((value, index) => {
    if (value["id"] == action.payload["id"]) {
      indx = index;
    }
  });

  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items:
          indx == undefined || indx < 0
            ? [...state.items, newItems(action.payload)]
            : increment(state.items, indx),
        total: state.total + parseInt(action.payload.price),
      };
    case "DEL_TO_CART":
      if (action.payload.count <= 1) state.items.splice(indx, 1);
      return {
        ...state,
        items:
          action.payload.count <= 1
            ? state.items
            : discrement(state.items, indx),
        total: state.total - parseInt(action.payload.price),
      };
    case "GET_LOCAL_DATA":
      return {
        ...state,
        items: [...state.items, ...action.payload],
        // total: state.total - parseInt(action.payload.price),
      };
    default:
      return state;
  }
};

const increment = (items, index) => {
  items[index].count++;
  return items;
};

const oldItems = (item) => {};

const discrement = (items, index) => {
  items[index].count--;
  return items;
};

const newItems = (item) => {
  item.count = 1;
  return item;
};

export default cartReducer;
