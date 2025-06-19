import { Box, Skeleton } from "@radix-ui/themes";

function LoadingCreatePage() {
  return (
    <Box   className="max-w-xl space-y-3">
  <Skeleton/>
  <Skeleton height="20rem"/>
    </Box >
  );
}

export default LoadingCreatePage;
