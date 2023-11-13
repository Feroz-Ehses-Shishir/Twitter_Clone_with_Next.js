import axios from "axios";

export const userActions = {
  UPDATE: async (payload, state, dispatch) => {
    const { data } = await axios.patch(`/api/users/${payload.id}`, {
        name: payload.name,
        bio: payload.bio,
        img: payload.img,
        cover: payload.cover,
      });
    return {...state,
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
