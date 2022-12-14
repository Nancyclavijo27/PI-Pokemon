const initialState = {
  pokemons: [],
  pokemons2: [],
  types: [],
  detail: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_POKES":
      return {
        ...state,
        pokemons: payload,
        pokemons2: payload,
      };

    case "GET_ALL_TYPES":
      return {
        ...state,
        types: payload,
      };

    case "GET_NAME":
      let nombres =
        payload === ""
          ? state.pokemons2
          : state.pokemons.filter((e) =>
              e.name.toLowerCase().includes(payload.toLowerCase())
            );
      return {
        ...state,
        pokemons: nombres,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: payload,
      };

    case "CLEAN_FILTERS":
      return {
        ...state,
        pokemons2: state.pokemons,
      };

    case "RES_STATE":
      return {
        ...state,
        detail: [],
      };

    case 'POST_POKES':
       return{
        ...state
      }

    case "HANDLER_NAME":
      let sortAlf;
      if (payload === "asc") {
        sortAlf = state.pokemons2.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "desc") {
        sortAlf = state.pokemons2.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      } else {
        sortAlf = state.pokemons2;
      }
      return {
        ...state,
        pokemons: sortAlf,
      };

      case "FILTER_CREATED":
         const allPokes2 = state.pokemons2
         const createdFilter =payload === "created" ? allPokes2.filter(el=> el.createdDB):allPokes2.filter(el=>!el.createdDB)
             return {
                ...state,
                pokemons:payload === "All" ? state.pokemons2 : createdFilter
                
     }

    case "HANDLER_STRENGTH":
      let strength =
        payload === "asc"
          ? state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return -1;
              }
              if (b.strength > a.strength) {
                return 1;
              }
              return 0;
            })
          : state.pokemons2.sort(function (a, b) {
              if (a.strength > b.strength) {
                return 1;
              }
              if (b.strength > a.strength) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: strength,
      };

    case "HANDLER_TYPES":
      let tipos =
        payload === "all"
          ? state.pokemons2
          : state.pokemons2?.filter((e) => e.types?.includes(payload));
      return {
        ...state,
        pokemons: tipos,
      };

    default:
      return state;
  }
}