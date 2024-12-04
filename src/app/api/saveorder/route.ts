import { adminDB } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const {cart, email, id, totalAmt} = reqBody;

        // Save the order to the database
        const orderItem={
            amount:totalAmt,
            items:cart || [],
        }
        if (cart.length){
            const userOrderRef = adminDB
            .collection('users')
            .doc(email)
            .collection('orders')
            .doc(id);

            const userDoc = await userOrderRef.get();
            if (!userDoc.exists){
                await userOrderRef.set({email});
            }
            await userOrderRef.set(
                {value:orderItem},
                {merge:true}
            );

        }

        return NextResponse.json({
            success:true,
            message:'Order saved successfully',
        }, {status:200});

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error,
        })
    }
}