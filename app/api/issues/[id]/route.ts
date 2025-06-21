import { createIssueSchema, urlSchema } from "@/app/validations";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: Promise<{ id: string }>;
};
export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;
  const validateURL = urlSchema.safeParse({ id });
  if (!validateURL.success)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });

  const body = await request.json();

  const validate = createIssueSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.format(), { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: validate.data.title,
      description: validate.data.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const url = await params;
  const validateURL = urlSchema.safeParse(url);

  if (!validateURL.success)
    return NextResponse.json({ error: "Issue Not found" }, { status: 404 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(url.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue Not found" }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}
