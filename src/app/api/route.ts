import { NextRequest, NextResponse } from "next/server";
import data from "@/data/dsa.json";

export async function GET(req: NextRequest) {
    return NextResponse.json(data);
}
