import api from "../../provider/Tools/api";

export const API_PREFIX_PROFILE = "/api/profile";
export const API_PREFIX_BOARD = "/api/board";
export const API_PREFIX_FRIEND = "/api/friend";
export const API_ADD_FRIEND = "/api/";


export const apiEditProfile = (data, cancelToken) => {
  const url = `${API_PREFIX_PROFILE}`;
  return api.post(url, data, cancelToken);
};

export const apiFoundFriend = (data, cancelToken) => {
  const url = `${API_PREFIX_FRIEND}/add`;
  return api.post(url, data, cancelToken);
};

export const apiCreateBoard = (data, cancelToken) => {
  const url = `${API_PREFIX_BOARD}`;
  return api.post(url,data, cancelToken);
};
