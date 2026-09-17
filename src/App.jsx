import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./components/post";
import Feed from "./components/Feed";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-post" element={<Post />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
