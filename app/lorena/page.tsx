import { Invite } from "@/components/lorena/Invite";
import { getContent } from "@/lib/lorena/content";
import { defaultEdition } from "@/lib/lorena/editions";
import { inviteMetadata } from "@/lib/lorena/metadata";

/** convitelorena.vercel.app (root) — keeps showing the original edition. */
export const metadata = inviteMetadata(defaultEdition, "/");

export default function LorenaPage() {
  return <Invite content={getContent(defaultEdition)} />;
}
