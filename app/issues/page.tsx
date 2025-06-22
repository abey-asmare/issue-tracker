import { prisma } from "@/prisma/client";
import Pagination from "../components/Pagination";
import { Issue, Status } from "../generated/prisma";
import IssueAction from "./_components/IssueAction";
import IssueTable, { columnNames } from "./_components/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export type IssueQuery = { status: Status; orderBy: keyof Issue; page: string };

type Props = {
  searchParams: Promise<IssueQuery>;
};

async function IssuePage({ searchParams: sp }: Props) {
  const searchParams = await sp;
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const where = { status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex gap="2" direction='column' mb='4'>
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Issue Tracker - Issue Lists",
  description: "View all Project Issues",
};


export default IssuePage;
