import { editions, editionSlugs, isEditionSlug } from "@/lib/lorena/editions";
import { icsFile } from "@/lib/lorena/calendar";

/** convitelorena.vercel.app/<cidade>/agenda — the event as an .ics file (iPhone, Outlook…). */
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => editionSlugs.map((cidade) => ({ cidade }));

export async function GET(_req: Request, { params }: { params: Promise<{ cidade: string }> }) {
  const { cidade } = await params;
  if (!isEditionSlug(cidade)) return new Response("Not found", { status: 404 });
  return new Response(icsFile(cidade, editions[cidade]), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="brunch-lorena-${cidade}.ics"`,
    },
  });
}
