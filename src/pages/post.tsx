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
    <div className="font-bold flex flex-col flex-1 items-center">
      <h1 className="mb-10">Create Post</h1>
      <form
        className="transition-all ease-in duration-150 flex flex-col gap-2 w-full sm:w-5/6"
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
          className="p-2 border-b rounded-md shadow-sm"
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
          className="p-2 border-b rounded-md shadow-sm"
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

        <button type="submit" className="p-2 bg-red-300 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sites;
