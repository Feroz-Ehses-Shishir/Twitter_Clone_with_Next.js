import axios from "axios";
import { BsCheckLg } from "react-icons/bs";

export const POST_ACTIONS = {
  post: async (payload, state, dispatch) => {
    const data = await axios.post(`/api/posts`, {
      userId: payload.id,
      reTweetPostId: payload.reTweetPostId,
      text: payload.input,
      image_url: payload.filename,
      type: payload.type,
      parentId: payload.parent,
    });

    if (payload.type == "post") {
      return [data.data,...state];
    }
    else if (payload.type == "reTweet") {
      const newData = data.data;
      delete newData.reTweetPostId;
      const reTweetPostId = { reTweetPostId : {
        userId:payload.id,
        text:payload.input,
        image_url:payload.filename,
        userId:{
          _id:payload.main_user_id,
          img:payload.user_img,
          name:payload.user_name,
        }
      },
      userId:{
        _id:payload.id,
        name:payload.repost_user_name,
      }
      }
     const combined = Object.assign({},newData,reTweetPostId);

      // console.log(combined);
      return [combined,...state];
    }
    else if (payload.type == "comment") {
      const updatedItems = state.map((i) => {
        if (i._id === data.data.parentId) {
          return {
            ...i,
            comments: [data.data,...i.comments],
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
                comments: [data.data,...j.comments],
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
    const { data } = await axios.get(`/api/posts/home?id=${payload.id}&page=${payload.page}`);

    if(payload.page==0){
      return data;
    }
    else{
      return [...state,...data];
    }
  },

  GET_BY_PROFILE: async (payload, state, dispatch) => {
    const { data } = await axios.get(`/api/posts/profile?id=${payload.id}&page=${payload.page}`);
    if(payload.page==0){
      return data;
    }
    else{
      return [...state,...data];
    }
  },

  DELETE: async (payload, state, dispatch) => {
    await axios.delete(`/api/posts/home?id=${payload.id}`);

    if (payload.type == "post" || payload.type == "reTweet") {
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
    await axios.patch(`/api/posts/home?id=${payload.id}`, {
      text: payload.input,
      filename: payload.filename,
    });

    if (payload.type == "post" || payload.type == "reTweet") {
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
  LIKE: async (payload, state, dispatch) => {
    await axios.patch(`/api/posts/home?id=${payload.id}`, {
      likedId: payload.likedId,
      isLiked: payload.isLiked,
    });

    if (payload.type == "post" || payload.type == "reTweet") {
      const updatedItems = await state.map((item) => {
        if (item._id == payload.id) {
          if(payload.isLiked==false){
            return { ...item, liked: [...item.liked,payload.likedId] };
          }
          else{
            const likes = item.liked.filter((item) => item !== payload.likedId);
            return { ...item, liked: likes };
          }
        }
        return item;
      });
      return updatedItems;
    } else if (payload.type == "comment") {
      const updatedItems = state.map((i) => {
        return {
          ...i,
          comments: i.comments.map((item) => {
            if (item._id == payload.id) {
              if(payload.isLiked==false){
                return { ...item, liked: [...item.liked,payload.likedId] };
              }
              else{
                const likes = item.liked.filter((item) => item !== payload.likedId);
                return { ...item, liked: likes };
              }
            }
            return item;
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
              comments: j.comments.map((item) => {
                if (item._id == payload.id) {
                  if(payload.isLiked==false){
                    return { ...item, liked: [...item.liked,payload.likedId] };
                  }
                  else{
                    const likes = item.liked.filter((item) => item !== payload.likedId);
                    return { ...item, liked: likes };
                  }
                }
                return item;
              }),
            };
          }),
        };
      });
      return updatedItems;
    }
  },
};