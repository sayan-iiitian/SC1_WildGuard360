// import { createSlice } from "@reduxjs/toolkit";
// import { user } from "../assets/data";

// const initialState = {
//   user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
//   edit: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logout(state) {
//       state.user = null;
//       localStorage?.removeItem("user");
//     },
//     updateProfile(state, action) {
//       state.edit = action.payload;
//     },
//   },
// });
// export default userSlice.reducer;

// export function UserLogin(user) {
//   return (dispatch, getState) => {
//     dispatch(userSlice.actions.login(user));
//   };
// }

// export function Logout() {
//   return (dispatch, getState) => {
//     dispatch(userSlice.actions.logout());
//   };
// }

// export function UpdateProfile(val) {
//   return (dispatch, getState) => {
//     dispatch(userSlice.actions.updateProfile(val));
//   };
// }
import { createSlice } from "@reduxjs/toolkit";

const getInitialData = (key, defaultValue) => {
  const item = window?.localStorage.getItem(key);
  try {
    return JSON.parse(item) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialState = {
  user: getInitialData("user", {}),
  posts: getInitialData("posts", []), // New state for posts
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.posts = []; // Clear posts on logout
      localStorage.removeItem("user");
      localStorage.removeItem("posts"); // Remove posts from localStorage
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
    setUserField(state, action) {
      const { field, value } = action.payload;
      state.user = { ...state.user, [field]: value };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // New action to set the posts array
    setPosts(state, action) {
      state.posts = action.payload;
      localStorage.setItem("posts", JSON.stringify(action.payload));
    },
    // New action to add a single post
    addPost(state, action) {
      state.posts.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    // New action to update a specific post by index
    updatePost(state, action) {
      const { index, post } = action.payload;
      state.posts[index] = post;
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },
});

export default userSlice.reducer;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdateProfile(val) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateProfile(val));
  };
}

export function SetUserField(field, value) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.setUserField({ field, value }));
  };
}

export function SetUser(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.setUser(user));
  };
}

// Action to set the entire posts array
export function SetPosts(posts) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.setPosts(posts));
  };
}

// Action to add a single post
export function AddPost(post) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.addPost(post));
  };
}

// Action to update a specific post by index
export function UpdatePost(index, post) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updatePost({ index, post }));
  };
}

