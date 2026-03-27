import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth();

    const invoice = await db.invoice.findUnique({
      where: { id: params.id },
      include: { supplier: true, purchaseOrder: true, payments: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ invoice }, { status: 200 });
  } catch (error) {
    console.error("Get invoice error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { status, paymentAmount, paymentMethod, paymentRef } = body;

    const invoice = await db.invoice.findUnique({
      where: { id: params.id },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;

    if (paymentAmount !== undefined && paymentAmount > 0) {
      const newPaidAmount = invoice.paidAmount + paymentAmount;
      updateData.paidAmount = newPaidAmount;

      if (newPaidAmount >= invoice.totalAmount) {
        updateData.status = "PAID";
        updateData.paidAt = new Date();
      } else {
        updateData.status = "PARTIAL";
      }

      await db.payment.create({
        data: {
          invoiceId: params.id,
          amount: paymentAmount,
          method: paymentMethod || "UNKNOWN",
          reference: paymentRef,
          recordedBy: user.id,
        },
      });
    }

    const updatedInvoice = await db.invoice.update({
      where: { id: params.id },
      data: updateData,
      include: { supplier: true, payments: true },
    });

    return NextResponse.json({ invoice: updatedInvoice }, { status: 200 });
  } catch (error) {
    console.error("Update invoice error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
