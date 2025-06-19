import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

function LoadingDetailPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card >
        <Skeleton className="h-20 my-2" />
        <Skeleton className="h-20 my-2" />
      </Card>
    </Box>
  );
}

export default LoadingDetailPage;
