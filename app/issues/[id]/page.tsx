import IssueBadge from "@/app/components/IssueBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueBadge status={issue.status} />
        <Text as="p">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text as="p">{issue.description}</Text>
      </Card>
    </div>
  );
}

export default IssueDetailPage;
