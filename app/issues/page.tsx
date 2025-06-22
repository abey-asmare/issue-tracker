import { IssueBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { Issue, Status } from "../generated/prisma";
import IssueAction from "./_components/IssueAction";

type Props = {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
};

async function IssuePage({ searchParams: sp }: Props) {
  const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: "Issue", value: "title", classname: "" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      classname: "hidden md:table-cell",
    },
  ];

  const searchParams = await sp;
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={clsx("", column.classname)}
              >
                <Flex>
                  <Link
                    className="w-[10ch]"
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                    {column.value === searchParams.orderBy && (
                      <ArrowUpIcon className="inline ml-1 " />
                    )}
                  </Link>
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="text-sm md:hidden">
                  <IssueBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuePage;
