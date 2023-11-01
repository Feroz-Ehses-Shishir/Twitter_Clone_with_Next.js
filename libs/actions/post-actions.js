import axios from "axios";

export const POST_ACTIONS = {
  post: async (payload, state, dispatch) => {
    await axios
      .post(`/api/posts`, {
        userId: payload.id,
        text: payload.input,
        img: payload.filename,
        type: payload.type,
        parentId: payload.parent,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    return [
      ...state,
      {
        userID: payload.id,
        text: payload.input,
        image_url: payload.filename,
        type: payload.type,
        parent: payload.parent,
      },
    ];
  },

  get: async (payload, state, dispatch) => {
    
    const { data } = await axios.get(`/api/posts`);
    return data;
  },

  // decrement: (payload, state, dispatch) => {
  //   return prev => ({...prev, count: prev.count -1})
  // },
};
