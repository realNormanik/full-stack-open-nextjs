import { createBlog } from "./actions";

export default function NewBlogPage() {
  return (
    <div>
      <h1>Create a new blog</h1>
      <form action={createBlog} style={{ display: "grid", gap: "0.5rem", maxWidth: "24rem" }}>
        <label>
          Title
          <input name="title" type="text" required />
        </label>
        <label>
          Author
          <input name="author" type="text" required />
        </label>
        <label>
          URL
          <input name="url" type="url" required />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};