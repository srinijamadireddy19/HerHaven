
const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { isAuthenticated: true, user: action.payload };
      case "LOGOUT":
        return { isAuthenticated: false, user: null };
        case "UPDATE":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  

  export default authReducer;