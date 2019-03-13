import md5 from "md5";

function encode(str) {
  return encodeURIComponent(str)
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");
}

export function createSignature(obj) {
  if (obj.token !== "beejee") {
    throw new Error('"token" should be equal "beejee"');
  }

  const { token, ...params } = obj;

  const sortedParams = Object.entries(params).sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });

  const encodedParams = [...sortedParams, ["token", obj.token]]
    .map(([key, value]) => `${encode(key)}=${encode(value)}`)
    .join("&");

  return md5(encodedParams);
}
