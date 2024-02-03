import { apiUrl } from "../constants";

export const fetchHandler = ({
    url = "",
    method = "GET",
    body = {},
    headers = {},
    secure = true,
    type = "application/json"
}) => {
    const LSObject = localStorage.getItem("persist:auth");
    const LSObjectJSON = LSObject ? JSON.parse(LSObject) : {};
    const jwt = LSObjectJSON?.jwt?.replace(/(^"|"$)/g, "") || null;

    if (!secure || (secure && jwt !== "null")) {
        const token = secure ? { jwt: `bearer:${jwt}` } : {};
        const bodyParams = method === "GET" ? {} : { body: JSON.stringify(body) };
        return fetch(
            `${apiUrl}${url}`,
            type === "multipart/form-data"
                ? { method, body }
                : {
                      method,
                      ...bodyParams,
                      headers: {
                          Accept: type,
                          "Content-Type": type,
                          ...headers,
                          ...token,
                      },
                  }
        ).then((res) => res.json());
    } else {
        return {
            data: {
                error: "Invalid token",
            },
        };
    }
};
