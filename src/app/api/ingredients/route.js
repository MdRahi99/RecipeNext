import { NextResponse } from 'next/server';
import ingredients from '../../../../ingredients.json';

export const GET = async (req, res) => {
    try {
        return NextResponse.json({ message: "Success", ingredients }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
};