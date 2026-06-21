import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { NOTES_REGISTRY, CATEGORIES } from "../src/data/notesRegistry";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    await prisma.category.upsert({
      where: { key },
      update: {
        title: cat.title,
        description: cat.description,
        emoji: cat.emoji,
        color: cat.color,
      },
      create: {
        key,
        title: cat.title,
        description: cat.description,
        emoji: cat.emoji,
        color: cat.color,
      },
    });
  }

  console.log("Seeding notes...");
  for (const note of NOTES_REGISTRY) {
    let content = "";
    try {
      const filePath = path.join(process.cwd(), "src", "notes", note.category, `${note.slug}.mdx`);
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, "utf-8");
      } else {
        console.warn(`File not found for ${note.id}: ${filePath}`);
      }
    } catch (err) {
      console.error(`Error reading file for ${note.id}:`, err);
    }

    await prisma.note.upsert({
      where: { id: note.id },
      update: {
        title: note.title,
        description: note.description,
        category: note.category,
        slug: note.slug,
        tags: note.tags,
        readTime: note.readTime,
        emoji: note.emoji,
        content: content || null,
        isPublished: true,
      },
      create: {
        id: note.id,
        title: note.title,
        description: note.description,
        category: note.category,
        slug: note.slug,
        tags: note.tags,
        readTime: note.readTime,
        emoji: note.emoji,
        content: content || null,
        isPublished: true,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
