import Pagination from "./components/Pagination";

type Props = {
  searchParams: Promise<{ page: string }>;
};
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  return (
    <div>
      <Pagination itemCount={100} pageSize={12} currentPage={parseInt(page)} />
    </div>
  );
}
