"use client";
import { TextArea, TextField, Button } from "@radix-ui/themes";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="create a new issue" />
      <TextArea placeholder="Reply to comment…" />
      <Button>Submit new Issue</Button>
    </div>
  );
}

export default NewIssuePage;
