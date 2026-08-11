import { ImageResponse } from "next/og";
import { prisma } from "./prisma/client";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const issue = await prisma.issue.findFirst();

  return new ImageResponse(
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {issue?.title || "No issue found"}
      </div>
  )
}
