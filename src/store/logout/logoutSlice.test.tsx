import mockApi from "../../resources/testconfig";
import store from "../index";
import { commonLogout } from "./slice";

test("calling the state of logout", async () => {
  mockApi.onPost("api/logout").reply(200, {});
  await store.dispatch(commonLogout());
});

test("calling the state of logout should give an error", async () => {
  mockApi.onPost("api/logout").reply(404);
  const result = await store.dispatch(commonLogout());
  console.log(result);
});
