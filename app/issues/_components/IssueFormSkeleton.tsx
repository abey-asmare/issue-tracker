import { Box, Skeleton } from "@radix-ui/themes";

function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton height='2rem' />
      <Skeleton height="20rem" />
    </Box>
  );
}

export default IssueFormSkeleton;
