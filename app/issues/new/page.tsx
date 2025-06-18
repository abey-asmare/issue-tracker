"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="create a new issue" />
      <SimpleMDE/>
      <Button>Submit new Issue</Button>
    </div>
  );
}

export default NewIssuePage;
