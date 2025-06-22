import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueBadge from "./IssueBadge";

async function LatestIssues() {
  const latestIssues = await prisma.issue.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb='4'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={"/issues/" + issue.id}>{issue.title}</Link>
                    <IssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}

export default LatestIssues;
