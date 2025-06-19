import NextLink from "next/link";
import { ReactNode } from "react";
function Link({ href, children }: { href: string; children: ReactNode }) {
  return <NextLink href={href}>{children}</NextLink>;
}

export default Link;
