import React from "react";
import { useForm } from "react-hook-form";

interface SitesProps {}

const Sites: React.FC<SitesProps> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-1 flex-col items-center font-bold">
      <h1 className="mb-10">Create Post</h1>
      <form
        className="flex w-full flex-col gap-2 transition-all duration-150 ease-in sm:w-5/6"
        onSubmit={handleSubmit(({ title, content }) => {
          fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
          });
        })}
      >
        <input
          placeholder="Post Title"
          className="rounded-md border-b p-2 shadow-sm"
          type="text"
          {...register("title", {
            required: "Title required",
            minLength: {
              value: 5,
              message: "Title is too short",
            },
          })}
        />
        <span className="text-sm font-normal text-red-400">
          {errors.title && errors.title.message}
        </span>

        <input
          placeholder="Post Content"
          className="rounded-md border-b p-2 shadow-sm"
          {...register("content", {
            required: "Post content required",
            minLength: {
              value: 10,
              message: "Too short",
            },
          })}
        />
        <span className="text-sm font-normal text-red-400">
          {errors.content && errors.content.message}
        </span>

        <button type="submit" className="rounded-md bg-red-300 p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sites;
