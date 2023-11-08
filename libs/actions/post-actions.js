import axios from "axios";

export const POST_ACTIONS = {
  post: async (payload, state, dispatch) => {
    const data = await axios.post(`/api/posts`, {
      userId: payload.id,
      text: payload.input,
      image_url: payload.filename,
      type: payload.type,
      parentId: payload.parent,
    });

    if (payload.type == "post") {
      return [...state, data.data];
    } else if (payload.type == "comment") {
      const updatedItems = state.map((i) => {
        if (i._id === data.data.parentId) {
          return {
            ...i,
            comments: [...i.comments, data.data],
          };
        }
        return i;
      });
      return updatedItems;
    } else if (payload.type == "reply") {
      const updatedItems = state.map((i) => {
        return {
          ...i,
          comments: i.comments.map((j) => {
            if (j._id === data.data.parentId) {
              return {
                ...j,
                comments: [...j.comments, data.data],
              };
            }
            return j;
          }),
        };
      });
      return updatedItems;
    }
  },

  get: async (payload, state, dispatch) => {
    const { data } = await axios.get(`/api/posts`);
    return data;
  },

  DELETE: async (payload, state, dispatch) => {
    await axios.delete(`/api/posts/${payload.id}`);

    if (payload.type == "post") {
      const updatedItems = await state.filter((item) => item._id !== payload.id);
      return updatedItems;
    } 
    else if (payload.type == "comment") {
      const updatedItems = await state.map((i) => {
        return {
          ...i,
          comments: i.comments.filter((item) => item._id !== payload.id)
        };
      });
      return updatedItems;
    } else if (payload.type == "reply") {
      const updatedItems = state.map((i) => {
        return {
          ...i,
          comments: i.comments.map((j) => {
            return {
              ...j,
              comments: j.comments.filter((item) => item._id !== payload.id)
            };
          }),
        };
      });
      return updatedItems;
    }
  },
  UPDATE: async (payload, state, dispatch) => {
    await axios.patch(`/api/posts/${payload.id}`, {
      text: payload.input,
      filename: payload.filename,
    });
    // console.log(payload.type);
    // console.log(state);
    if (payload.type == "post") {
      const updatedItems = await state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, text: payload.input, image_url: payload.filename };
        }
        return item;
      });
      return updatedItems;
    } else if (payload.type == "comment") {
      const updatedItems = state.map((i) => {
        return {
          ...i,
          comments: i.comments.map((j) => {
            if (j._id === payload.id) {
              return { ...j, text: payload.input, image_url: payload.filename };
            }
            return j;
          }),
        };
      });
      return updatedItems;
    } else if (payload.type == "reply") {
      const updatedItems = state.map((i) => {
        return {
          ...i,
          comments: i.comments.map((j) => {
            return {
              ...j,
              comments: j.comments.map((k) => {
                if (k._id === payload.id) {
                  return {
                    ...k,
                    text: payload.input,
                    image_url: payload.filename,
                  };
                }
                return k;
              }),
            };
          }),
        };
      });
      return updatedItems;
    }
  },
};
