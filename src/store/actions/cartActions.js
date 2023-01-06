export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const delToCart = (item) => {
  return {
    type: "DEL_TO_CART",
    payload: item,
  };
};

export const getLocalData = (item) => {
  return {
    type: "GET_LOCAL_DATA",
    payload: item,
  };
};
