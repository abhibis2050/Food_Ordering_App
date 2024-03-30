// import { prisma } from "../../../utils/connect"
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"


// FETCH ALL PRODUCTS
export const GET =async (req:NextRequest)=>{

    const {searchParams} = new URL(req.url)
    const cat = searchParams.get("cat")

    // console.log("category",cat)
    try {
        const products = await prisma.product.findMany({
            where:{
                ...(cat?{catSlug:cat}:{ isFeatured:true})
            }
        })
        return new NextResponse(JSON.stringify(products))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"Something Went Wrong"}),{status:200})
    }
  
}

  
