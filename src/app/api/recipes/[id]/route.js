import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { main } from "../route";

export const GET = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/recipes/")[1], 10);
    await main();
    const recipe = await prisma.Recipe.findFirst({ where: { id } });
    if (!recipe)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", recipe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/recipes/")[1], 10);
    const { title, ingredients, instructions, imageURL } = await req.json();
    await main();
    const recipe = await prisma.Recipe.update({
      data: { title, ingredients, instructions, imageURL },
      where: { id },
    });
    return NextResponse.json({ message: "Success", recipe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req, res) => {
  try {
    const id = parseInt(req.url.split("/recipes/")[1], 10);

    await prisma.Recipe.delete({ where: { id } });
    
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Recipe'`;
    await prisma.$executeRaw`INSERT INTO sqlite_sequence (name, seq) VALUES ('Recipe', (SELECT COALESCE(MAX(id), 0) FROM "Recipe"))`;

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
