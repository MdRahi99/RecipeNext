import { NextResponse } from 'next/server';
import ingredients from '../../../../ingredients.json';

// Get All Ingredients Data Api
export const GET = async (req, res) => {
    try {
        return NextResponse.json({ message: "Success", ingredients }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};