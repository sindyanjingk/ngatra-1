import { NextResponse } from "next/server";

import crypto from 'crypto'





export async function GET(){
    function generateApiKey() {
        return crypto.randomBytes(32).toString('hex');
      }
      console.log(generateApiKey());
      const randomKey = crypto.randomBytes(32).toString();
    return NextResponse.json({

    })
}