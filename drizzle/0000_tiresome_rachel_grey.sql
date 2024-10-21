CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS "documents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "documents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" text NOT NULL,
	"embedding" vector(1024) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prompts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "prompts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"prompt" text NOT NULL,
	CONSTRAINT "prompts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_embedding_index" ON "documents" USING hnsw ("embedding" vector_cosine_ops);
