import { prisma } from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  await delay(3000);
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}

export default IssueDetailPage;
