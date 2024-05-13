import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import PostDetail from "./components/PostDetail";
import Posts from "./components/Posts";
import { ServiceProvider } from "./contexts/ServiceContext";
import { RoutePath } from "./routes";

const PostRoutes = () => (
  <Routes>
    <Route path={RoutePath.Root} element={<Posts />} />
    <Route path={RoutePath.PostDetail} element={<PostDetail />} />
  </Routes>
);

function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.Root} element={<Login />} />
          <Route path={RoutePath.PostsRoutes} element={<PostRoutes />} />
          <Route path={RoutePath.Error} element={<h1>Error Page!</h1>} />
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}

export default App;
