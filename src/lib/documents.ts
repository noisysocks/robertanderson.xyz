import { cosineDistance, desc, eq, gt, sql } from "drizzle-orm";
import { documents } from "@/db/schema";
import { db } from "@/db";
import { VoyageAIClient } from "voyageai";

export async function createDocument(
  data: Omit<typeof documents.$inferInsert, "embedding">,
) {
  const embedding = await embed(data.content, "document");

  if (!embedding) {
    throw new Error("Could not embed document");
  }

  const dataWithEmbedding = { ...data, embedding };

  await db.insert(documents).values(dataWithEmbedding);
}

export async function updateDocument(
  id: number,
  data: Omit<typeof documents.$inferInsert, "embedding">,
) {
  const embedding = await embed(data.content, "document");

  if (!embedding) {
    throw new Error("Could not embed document");
  }

  const dataWithEmbedding = { ...data, embedding };

  await db.update(documents).set(dataWithEmbedding).where(eq(documents.id, id));
}

export async function deleteDocument(id: number) {
  await db.delete(documents).where(eq(documents.id, id));
}

export async function searchDocuments(query: string) {
  const queryEmbedding = await embed(query, "query");

  if (!queryEmbedding) {
    throw new Error("Could not embed search query");
  }

  const similarity = sql<number>`1 - (${cosineDistance(documents.embedding, queryEmbedding)})`;
  const rows = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    .from(documents)
    // .where(gt(similarity, 0.5))
    .orderBy(desc(similarity))
    .limit(5);

  console.log("searchDocuments", query, rows);

  return rows;
}

export async function getAllDocuments() {
  return db.query.documents.findMany();
}

async function embed(input: string, inputType: "document" | "query") {
  const client = new VoyageAIClient({ apiKey: process.env.VOYAGEAI_API_KEY });

  const response = await client.embed({
    input,
    inputType,
    model: "voyage-3",
  });

  return response.data?.[0].embedding;
}
