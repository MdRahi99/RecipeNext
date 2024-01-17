import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

// DB Connection
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database Connection Unsuccessful");
  }
}

// Get All Recipes Data Api
export const GET = async (req, res) => {
  try {
    await main();
    const recipes = await prisma.Recipe.findMany();
    return NextResponse.json({ message: "Success", recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// Post Recipe Data Api
export const POST = async (req, res) => {
  try {
    const { id, title, ingredients, instructions, imageURL } = await req.json();
    await main();
    const recipe = await prisma.Recipe.create({ data: { id, title, ingredients, instructions, imageURL } });
    return NextResponse.json({ message: "Success", recipe }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};