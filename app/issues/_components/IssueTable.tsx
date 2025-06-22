import { IssueBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { IssueQuery } from "../page";

function IssueTable({ searchParams, issues }: Props) {
  return (
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
  );
}

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: "Issue", value: "title", classname: "" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  {
    label: "CreatedAt",
    value: "createdAt",
    classname: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
