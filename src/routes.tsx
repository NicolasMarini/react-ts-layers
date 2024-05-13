import Home from "./components/Home";
import Login from "./components/Login";

type Route = {
  path: string;
  component: React.ComponentType;
};

const routes: Route[] = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
];

export enum RoutePath {
  Root = "/",
  PostsRoutes = "/posts/*",
  PostDetail = "/:postId",
  Error = "*",
}
