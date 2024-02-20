import PostsList from "./features/post/PostsList.jsx";
import AddPostForm from "./features/post/AddPostForm.jsx";
import PostPageSingle from "./features/post/PostPageSingle.jsx";
import PostEdit from "./features/post/PostEdit.jsx";
import Layout from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<PostPageSingle />} />
          <Route path="edit/:postId" element={<PostEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
