import { EditIssueButton, IssueDetail } from "@/app/issues/[id]/components";
import { prisma } from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
