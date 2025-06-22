"use client";
import { Issue, User } from "@/app/generated/prisma";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, isLoading, error } = useUsers();
  const assignIssue = (userId: string) =>
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId !== "unassigned" ? userId : null,
      })
      .then(() => toast.success("change has been made successfully."))
      .catch(() => toast.error("User can't be assigned, try again later."));

  if (isLoading) return <Skeleton />;
  if (error) return;
  return (
    <>
      <Select.Root
        onValueChange={assignIssue}
        defaultValue={issue.assignedToUserId || ""}
      >
        <Select.Trigger placeholder="Assign ..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
}

export default AssigneeSelect;
function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 60, // 1h
    retry: 3,
  });
}
