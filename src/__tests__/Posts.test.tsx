import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Posts from "../components/Posts";
import { ServiceProvider } from "../contexts/ServiceContext";
import { MemoryRouter, Router } from "react-router-dom";

describe("Posts", () => {
  it("should render the list os posts", async () => {
    render(
      <ServiceProvider>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </ServiceProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
      expect(screen.getByText("Title 2")).toBeInTheDocument();
    });
  });
});
