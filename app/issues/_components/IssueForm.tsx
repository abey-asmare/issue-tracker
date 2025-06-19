"use client";
import { ErrorMessage } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { createIssueSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      route.push("/issues");
    } catch {
      setSubmitting(false);
      setError("unexpected error occured");
    }
  };
  const route = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
        <TextField.Root
          placeholder="create a new issue"
          {...register("title")}
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE {...field} />}
          defaultValue={issue?.description}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          Submit new Issue {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
