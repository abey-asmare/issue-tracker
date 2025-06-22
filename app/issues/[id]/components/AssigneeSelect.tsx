"use client";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers();
    async function getUsers() {
      try {
        const { data } = await axios.get<User[]>("/api/users/");
        setUsers(data);
      } catch {
        console.log("error error");
      }
    }
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign ..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
