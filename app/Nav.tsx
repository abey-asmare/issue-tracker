"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
function Nav() {
  return (
    <nav className="border-b border-zinc-600 px-6 py-2 mb-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="3">
            <Link href="/">
              <AiFillBug className="h-5 w-5" />
            </Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

export default Nav;
function NavLink() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex items-center gap-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={clsx("nav-link", {
              "!text-zinc-900": currentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width='3rem' />;
  return (
    <Box>
      {status === "authenticated" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              size="2"
              radius="full"
              src={session.user!.image!}
              fallback="?"
              className="cursor-pointer hover:opacity-85"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout/">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Link className="nav-link" href="/api/auth/signin/">
          Log in
        </Link>
      )}
    </Box>
  );
}
