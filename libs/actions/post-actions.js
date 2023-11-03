import axios from "axios";

export const POST_ACTIONS = {
  post: async (payload, state, dispatch) => {
    await axios
      .post(`/api/posts`, {
        userId: payload.id,
        text: payload.input,
        image_url: payload.filename,
        type: payload.type,
        parentId: payload.parent,
        fId: payload.fId
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
        userId: payload.id,
        text: payload.input,
        image_url: payload.filename,
        type: payload.type,
        parentId: payload.parent,
        fId: payload.fId
      },
    ];
  },

  get: async (payload, state, dispatch) => {
    const { data } = await axios.get(`/api/posts`);
    return data;
  },

  DELETE: async (payload, state, dispatch) => {
    const { data } = await axios.delete(`/api/posts/${payload.fId}`);
    const updatedItems = await state.filter(item => item.fId !== payload.fId);
    return updatedItems;
  },
};
