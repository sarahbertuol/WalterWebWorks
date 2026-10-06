import { Invite } from "@/components/lorena/Invite";
import { getContent } from "@/lib/lorena/content";
import { editionSlugs, isEditionSlug } from "@/lib/lorena/editions";
import { inviteMetadata } from "@/lib/lorena/metadata";
import { notFound } from "next/navigation";

/** convitelorena.vercel.app/<cidade> — one invitation per city (lib/lorena/editions.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return editionSlugs.map((cidade) => ({ cidade }));
}

type Props = { params: Promise<{ cidade: string }> };

export async function generateMetadata({ params }: Props) {
  const { cidade } = await params;
  return isEditionSlug(cidade) ? inviteMetadata(cidade, `/${cidade}`) : {};
}

export default async function CityInvitePage({ params }: Props) {
  const { cidade } = await params;
  if (!isEditionSlug(cidade)) notFound();
  return <Invite content={getContent(cidade)} />;
}
