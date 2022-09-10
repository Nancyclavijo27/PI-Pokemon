
import axios from "axios";

export function getPokes() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/pokemons")
      .then((res) => {
        return dispatch({
          type: "GET_POKES",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getTypes() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/types")
      .then((res) => {
        return dispatch({
          type: "GET_ALL_TYPES",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getName(name) {
  return {
    type: "GET_NAME",
    payload: name,
  };
}

export function getDetail(id){//funcion detallee
  return async function (dispatch) {
      try {
          var json = await axios.get("http://localhost:3001/pokemons/" + id);
          return dispatch ({
              type: "GET_DETAILS",
              payload: json.data
          })
      }
      catch(error) {
          console.log(error)
      }
  }
}

export function postPoke(payload) {
  return async function () {
    const create = await axios.post("http://localhost:3001/pokemons", payload);
    return create;
  };
}

export function cleanFilters(payload) {
  return {
    type: "CLEAN_FILTERS",
    payload: payload,
  };
}

export function resState() {
  return {
    type: "RES_STATE",
  };
}

export function ordenByName(payload) {
  return {
    type: "HANDLER_NAME",
    payload: payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload: payload,
  };
}

export const ordenByStrength = (payload) => {
  return {
    type: "HANDLER_STRENGTH",
    payload: payload,
  };
};

export const handlerTypes = (payload) => {
  // este payload representa el valor de input, es decir el valor de nuestro select
  return {
    type: "HANDLER_TYPES",
    payload: payload,
  };
};