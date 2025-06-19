import { Skeleton, Table } from "@radix-ui/themes";
import clsx from "clsx";
import IssueAction from "./components/IssueAction";
import delay from "delay";

async function LoadingIssues() {
  const headings = [
    { label: "Issue", classname: "" },
    { label: "Status", classname: "hidden md:table-cell" },
    { label: "CreatedAt", classname: "hidden md:table-cell" },
  ];

  await delay(3000);
  const issues = Array.from({ length: 3 });
  return (
    <div>
      <IssueAction />
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
          {issues.map((issue, _) => (
            <Table.Row key={_}>
              <Table.RowHeaderCell>
                <Skeleton />

                <div className="text-sm md:hidden">
                  <Skeleton />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default LoadingIssues;
