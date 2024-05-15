import { HOST, POSTS } from "../properties";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    `${HOST}${POSTS}`,
    async ({ params, request }): Promise<HttpResponse> => {
      console.log("handling GET request...");

      const data = [
        {
          id: 1,
          userId: 1,
          title: "Title 1",
          body: "Body 1",
        },
        {
          id: 2,
          userId: 2,
          title: "Title 2",
          body: "Body 2",
        },
      ];

      return HttpResponse.json(data);
    }
  ),
];
