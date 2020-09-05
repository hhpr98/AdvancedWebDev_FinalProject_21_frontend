const initState = {
  isLogin : false,
  user: []
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
      case 'LOGIN_REQUEST':
          return {   
            isLogin: true,
            user: action.user             
          };
      case "LOGIN_SUCCESS":
          return {
            isLogin: true,
           user: action.user
          };
      case "LOGIN_FAILURE":
            return {
              isLogin : false,
              user: []
            };
      case 'LOGOUT':
        return {};
      default:
          return state;
  }
};

export default authReducer;