import { prisma } from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import IssueBadge from "../components/IssueBadge";

async function IssuePage() {
  const issues = await prisma.issue.findMany();
  const headings = [
    { label: "Issue", classname: "" },
    { label: "Status", classname: "hidden md:table-cell" },
    { label: "CreatedAt", classname: "hidden md:table-cell" },
  ];
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headings.map((heading) => (
              <Table.ColumnHeaderCell
                key={heading.label}
                className={clsx("", heading.classname)}
              >
                {heading.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                {issue.title}

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

export default IssuePage;
