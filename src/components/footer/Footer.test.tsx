import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "../../store";

it("render without crashing Footer", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
});
