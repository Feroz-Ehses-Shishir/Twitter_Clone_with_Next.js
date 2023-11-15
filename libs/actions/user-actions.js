import axios from "axios";

export const userActions = {
  UPDATE: async (payload, state, dispatch) => {
    console.log(payload.follow);
    const { data } = await axios.patch(`/api/users/${payload.id}`, {
      name: payload.name,
      bio: payload.bio,
      img: payload.img,
      cover: payload.cover,
      follow: payload.follow,
      user_id: payload.user_id,
    });
    console.log(data);
    // if (payload.follow !== undefined) {
    //   if (!payload.follow) {
    //     return { ...data, following: [...data?.following, payload.user_id] };
    //   } else {
    //     return {
    //       ...data,
    //       following: data?.following.filter((item) => item !== payload.user_id),
    //     };
    //   }
    // }
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
};
