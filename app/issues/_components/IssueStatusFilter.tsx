"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; status?: Status }[] = [
  { label: "All" },
  { label: "Open", status: "OPEN" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "Closed", status: "CLOSED" },
];

function IssueStatusFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(value) => {
        const status = value !== "ALL" ? value : "";
        const orderBy = searchParams.get("orderBy");
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (orderBy) params.append("orderBy", orderBy);
        router.push("/issues" + params.size ? "?" + params.toString() : "");
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.status || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
