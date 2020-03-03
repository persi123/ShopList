import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";
import Axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  Axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const addItem = name => (dispatch, getState) => {
  console.log(name);
  Axios.post("/api/items", name, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEMS,
        item: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteItem = id => (dispatch, getState) => {
  console.log(id);
  Axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEMS,
        DataId: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
