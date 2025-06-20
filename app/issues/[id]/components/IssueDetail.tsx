import { IssueBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueBadge status={issue.status} />
        <Text as="p">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}

export default IssueDetails;
