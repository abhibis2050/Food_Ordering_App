// import { prisma } from "../../../utils/connect"
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"


// FETCH ALL ORDERS
export const GET =async (req:NextRequest)=>{
    
    const sessions = await getAuthSession()
    if(sessions){
        try {
            // if(sessions?.user)
            const products = await prisma.product.findMany({
                where:{
                    ...(cat?{catSlug:cat}:{ isFeatured:true})
                }
            })
            return new NextResponse(JSON.stringify(products))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({message:"Something Went Wrong"}),{status:500})
        }
    }else{
        return new NextResponse(JSON.stringify({message:"You Are Not Authenticated"}),{status:4010})
    }
    
   
  
}

  
