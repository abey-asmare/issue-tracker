"use client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

type IssueForm = {
  title: string;
  description: string;
};

function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const route = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        route.push("/issues");
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root placeholder="create a new issue" {...register("title")} />
      <Controller
        control={control}
        name="description"
        render={({ field }) => <SimpleMDE {...field} />}
      />
      <Button>Submit new Issue</Button>
    </form>
  );
}

export default NewIssuePage;
