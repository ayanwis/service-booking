// Store token into localStorage
export const saveSession = (accessToken) => {
  localStorage.setItem("access_token", JSON.stringify(accessToken));
};

// Delete token from localStorage
export const deleteSession = () => {
  localStorage.removeItem("access_token");
};

// GET ITEM BY KEY
export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// SET ITEM (KEY, VALUE)
export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// DELETE ITEM BY KEY
export const deleteItem = (key) => {
  localStorage.removeItem(key);
};

// Get user details from session_token
export const getUserDetails = () => {
  if (getItem("access_token")) {
    var base64Url = getItem("access_token").split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } else {
    return false;
  }
};

// Check token expired or not
export const checkUserSession = () => {
  return Date.now() > getUserDetails()?.exp;
};

/** 
// Get refresh token from api
export const getRefreshToken = async () => {
  try {
    const { data: res } = await postService(
      "/api/v1/user/refreshtoken?_format=json",
      {},
      true
    );
    if (res.code === "200" && res.status === "success") {
      setItem("access_token", res.data.ACCESS_TOKEN);
      window.location.reload(); // Reloading page after saving refresh token
    }
  } catch (error) {
    console.log(error.message);
  }
};
*/
