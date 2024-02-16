import PostsList from "./features/post/PostsList.jsx";
import AddPostForm from "./features/post/AddPostForm.jsx";

import "./App.css";

function App() {
  return (
    <main className="App">
      <PostsList />
      <AddPostForm />
    </main>
  );
}

export default App;
