import { EditIssueButton, IssueDetail } from "@/app/issues/[id]/components";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./components/DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./components/AssigneeSelect";
import { cache } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const fetchUser = cache((id: number) =>
  prisma.issue.findUnique({ where: { id } })
);
async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));
  const session = await getServerSession();

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title || "Issue Details",
    description: "Details of issue " + id,
  };
}

export default IssueDetailPage;
