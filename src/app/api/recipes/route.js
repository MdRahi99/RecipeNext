// Get api to get all recipes
import recipesData from "../../../../ingredients.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(recipesData);
}