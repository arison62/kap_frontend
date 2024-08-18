import { SERVER_URL } from "./constants";

export default async function myFetch(
  pathname: string,
  { method, data, token }: { method: string; data: FormData; token: string }
) {
  try {
    const res = await fetch(`${SERVER_URL}/${pathname}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: method.toUpperCase() == "POST" ? data : null,
    });
    return res;
  } catch (err) {
    throw Error((err as Error).message);
  }
}
