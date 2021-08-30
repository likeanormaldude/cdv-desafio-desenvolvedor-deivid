export const initialState = {
  data: {},
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

    default:
      return state;
  }
};

export default reducer;
