"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
function Nav() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="border-b border-zinc-600 px-6 py-4 mb-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap='3'>
            <Link href="/">
              <AiFillBug className="h-5 w-5" />
            </Link>
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={clsx(" hover:text-zinc-800 transition-colors", {
                      "text-zinc-900": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout/">Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin/">Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default Nav;
