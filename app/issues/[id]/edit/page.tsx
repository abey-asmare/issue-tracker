import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormWrapper from "./components/IssueFormWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
}

export default EditIssuePage;
