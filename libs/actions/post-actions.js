import axios from "axios";

export const POST_ACTIONS = {
  post: async (payload, state, dispatch) => {
    const data = await axios
      .post(`/api/posts`, {
        userId: payload.id,
        text: payload.input,
        image_url: payload.filename,
        type: payload.type,
        parentId: payload.parent,
      });

    console.log(data);

    return [
      ...state,
      data.data
    ];
  },

  get: async (payload, state, dispatch) => {
    const { data } = await axios.get(`/api/posts`);
    return data;
  },

  DELETE: async (payload, state, dispatch) => {
    const { data } = await axios.delete(`/api/posts/${payload.id}`);
    const updatedItems = await state.filter(item => item._id !== payload.id);
    return updatedItems;
  },
  UPDATE: async (payload, state, dispatch) => {
    const { data } = await axios.patch(`/api/posts/${payload.id}`);
    const updatedItems = await state.filter(item => item._id !== payload.id);
    return updatedItems;
  },
};
