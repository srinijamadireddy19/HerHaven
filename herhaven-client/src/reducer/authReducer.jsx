<<<<<<< HEAD
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
  
=======
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
  
>>>>>>> a7a5ac24d79e247fd1326e8fd049e3b6ab827e35
  export default authReducer;