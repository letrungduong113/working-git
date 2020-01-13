export const GET_USERINFO = 'GET_USERINFO';

export function setUserInfo(userInfo) {
  // alert(JSON.stringify(markers))
  return {
    type: GET_USERINFO,
    userInfo
  };
}
