"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import SimpleMDE from "react-simplemde-editor";

type IssueForm = {
  title: string;
  description: string;
};

function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const route = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <BiInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            route.push("/issues");
          } catch {
            setError("unexpected error occured");
          }
        })}
        className="max-w-xl space-y-3"
      >
        <TextField.Root
          placeholder="create a new issue"
          {...register("title")}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
