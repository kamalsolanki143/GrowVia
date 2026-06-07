import { Metadata } from "next";
import PublicPassportClient from "@/app/passport/[username]/client";

export const metadata: Metadata = {
  title: "Talent Passport | Growvia",
  description: "View this student's verified Talent Passport on Growvia",
};

type Props = {
  params: Promise<{ username: string }>;
};

export default async function PublicPassportPage({ params }: Props) {
  const resolvedParams = await params;
  return <PublicPassportClient username={resolvedParams.username} />;
}
