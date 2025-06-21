import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validations";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validate = createIssueSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: validate.data.title,
      description: validate.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
