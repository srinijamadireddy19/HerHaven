const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "UPDATE":
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
