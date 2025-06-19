import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ReactNode } from "react";
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}

export default Link;
