export { default } from "next-auth/middleware";

export const config = {
  matcher: [{ source: "/issues/new" }, { source: "/issues/:id/edit" }],
};
