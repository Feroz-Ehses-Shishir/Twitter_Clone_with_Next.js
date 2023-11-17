import axios from "axios";

export const userActions = {
  UPDATE: async (payload, state, dispatch) => {
    const { data } = await axios.patch(`/api/users/${payload.id}`, {
      name: payload.name,
      bio: payload.bio,
      img: payload.img,
      cover: payload.cover,
      follow: payload.follow,
      user_id: payload.user_id,
    });

    if (payload.follow !== undefined) {
      if (payload.id == payload.profile_id) {
        if (!payload.follow) {
          return {
            ...state,
            following: [...state?.following, payload.user_id],
          };
        } else {
          return {
            ...state,
            following: state?.following.filter(
              (item) => item !== payload.user_id
            ),
          };
        }
      } else {
        if (!payload.follow) {
          return { ...state, followers: [...state?.followers, payload.id] };
        } else {
          return {
            ...state,
            followers: state?.followers.filter((item) => item !== payload.id),
          };
        }
      }
    }
    return {
      ...state,
      name: payload.name,
      bio: payload.bio,
      img: payload.img,
      cover: payload.cover,
    };
  },
  GET_BY_ID: async (payload, state, dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${payload.id}`);
      return data;
    } catch (err) {
      console.log("error", err);
    }
  },
};

export const followUserActions = {
  GET: async (payload, state, dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/follow/${payload.Id}`);
      return data;
    } catch (err) {
      console.log("error", err);
    }
  },
  GET_FOLLOWING_LIST: async (payload, state, dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/following-list//${payload.Id}`);
      return data;
    } catch (err) {
      console.log("error", err);
    }
  },
  GET_FOLLOWERS_LIST: async (payload, state, dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/followers-list//${payload.Id}`);
      return data;
    } catch (err) {
      console.log("error", err);
    }
  },
  UPDATE: async (payload, state, dispatch) => {
    dispatch(userActions.UPDATE, {
      id: payload.id,
      follow: payload.follow,
      user_id: payload.user_id,
      following: payload.following,
      profile_id: payload.profile_id,
    });
  },
};
