"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "./actions";
import { useNotification } from "../../components/NotificationContext";

const initialState = { errors: {}, values: {}, success: false };

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="card mx-auto max-w-lg">
      <h1>Create a new blog</h1>

      <form action={formAction} className="mt-6 grid gap-4">
        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Title
            <input name="title" type="text" defaultValue={state.values?.title} />
          </label>
          {state.errors?.title && <p className="mt-1.5 text-sm text-red-600">{state.errors.title}</p>}
        </div>

        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Author
            <input name="author" type="text" defaultValue={state.values?.author} />
          </label>
          {state.errors?.author && <p className="mt-1.5 text-sm text-red-600">{state.errors.author}</p>}
        </div>

        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            URL
            <input name="url" type="text" defaultValue={state.values?.url} />
          </label>
          {state.errors?.url && <p className="mt-1.5 text-sm text-red-600">{state.errors.url}</p>}
        </div>

        <button type="submit" data-testid="create-blog-button" className="create">
          Create
        </button>
      </form>
    </div>
  );
}