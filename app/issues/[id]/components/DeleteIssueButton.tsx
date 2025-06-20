import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">
      <TrashIcon />
      <Link href={`/issues/${issueId}/`}>Edit Issue</Link>
    </Button>
  );
}
export default DeleteIssueButton;
