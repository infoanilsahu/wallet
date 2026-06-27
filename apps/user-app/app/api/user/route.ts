import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions)
    
    if( session?.user ) {
        return NextResponse.json({
            user: session.user
        }, {status: 200})
    }

    return NextResponse.json({
        message: "You are not logged in"
    }, {status: 403})
}
