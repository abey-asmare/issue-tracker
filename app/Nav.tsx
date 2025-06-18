import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

function Nav() {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center gap-6 border-b border-zinc-600 px-6 py-4 mb-4">
      <Link href="/">
        <AiFillBug className="h-5 w-5" />
      </Link>
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
