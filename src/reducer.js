export const initialState = {
  data: {}, // Will have the data to display the info.
  loading: false, // Controls the loader gif image
  searchedOnDB: false, // Used to check if at least on query was made. Case true, renders Resultado
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: {
          precoUltPregao: action.data.precoUltPregao,
        },
      };
    case "SET_LOADER":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_SEARCHED_DB":
      return {
        ...state,
        searchedOnDB: action.searchedOnDB,
      };

    default:
      return state;
  }
};

export default reducer;
