import { IssueBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import clsx from "clsx";
import { Issue, Status } from "../generated/prisma";
import IssueAction from "./_components/IssueAction";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

type Props = {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
};

async function IssuePage({ searchParams: sp }: Props) {
  const searchParams = await sp;
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });
  const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: "Issue", value: "title", classname: "" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      classname: "hidden md:table-cell",
    },
  ];
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
                    {column.value === searchParams.orderBy && <ArrowUpIcon className="inline ml-1 "  />}
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
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuePage;
