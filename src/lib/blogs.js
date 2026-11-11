const globalStore = globalThis;

globalStore.__blogs ??= [
  {
    id: "1",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    id: "2",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "3",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

export function getBlogs() {
  return globalStore.__blogs;
};

export function addBlog({ title, author, url }) {
  const blog = { id: crypto.randomUUID(), title, author, url, likes: 0 };
  globalStore.__blogs.push(blog);
  return blog;
};

export function getBlog(id) {
  return globalStore.__blogs.find((blog) => blog.id === id);
};

export function incrementLikes(id) {
  const blog = getBlog(id);

  if (blog) {
    blog.likes += 1;
  };

  return blog;
};