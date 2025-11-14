import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { Metadata } from "next";
import { getNotes } from "@/lib/api/clientApi";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  const title = `Notes with tag: ${tag}`;
  const description = `All notes with tag: ${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub-public.goit.study/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${tag}`,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => getNotes(1, 12, undefined, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
