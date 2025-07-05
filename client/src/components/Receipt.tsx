import React, { forwardRef } from 'react';

interface ReceiptProps {
  saleItems: { name: string; qty: number; price: number }[];
  total: number;
  phone?: string;
  saleId?: string;
  date: string;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({ saleItems, total, phone, saleId, date }, ref) => {
  const itemCount = saleItems.reduce((sum, item) => sum + item.qty, 0);
  const tax = +(total * 0.1652).toFixed(2);

  return (
    <div ref={ref} className="p-4 text-black-900 bg-white w-[320px] text-xs">
      <div className="text-center font-bold">
        <p className="text-base">TAJI EATS RESTAURANT</p>
        <p>Authentic Traditional Cuisines</p>
        <p>Wilson Airport, Nairobi, Kenya</p>
        <p>TEL: +254 741 775 352</p>
        <p>EMAIL: orders@tajieats.co.ke</p>
        <p>PIN: P051234567A</p>
      </div>

      <p className="mt-2">CASHIER: 1 (Jane Doe)</p>
      <hr className="my-1" />
      <p>CLIENT PIN: 00000000000</p>
      <p>CLIENT NAME: Walk-in</p>

      <p className="mt-2 font-semibold">ITEMS SOLD &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; QTY PRICE TOTAL</p>
      <hr className="my-1" />

      {saleItems.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex-1 truncate">{item.name}</div>
          <div className="text-right w-24">{item.qty} x {item.price.toFixed(2)} = {(item.qty * item.price).toFixed(2)}</div>
        </div>
      ))}

      <p className="text-right text-xs italic">B-16%</p>
      <hr className="my-2" />

      <p className="flex justify-between"><span>TOTAL A-EX</span><span>0.00</span></p>
      <p className="flex justify-between font-bold"><span>TOTAL B-16%</span><span>{total.toFixed(2)}</span></p>
      <p className="flex justify-between"><span>TOTAL TAX-B</span><span>{tax}</span></p>
      <p className="flex justify-between"><span>TOTAL E-8%</span><span>0.00</span></p>
      <p className="flex justify-between"><span>TOTAL TAX-E</span><span>0.00</span></p>
      <p className="flex justify-between font-bold"><span>TOTAL TAX</span><span>{tax}</span></p>

      <p className="flex justify-between font-bold mt-2"><span>MOBILE MONEY</span><span>{total.toFixed(2)}</span></p>
      <p className="text-right">==============================</p>
      <p className="flex justify-between text-sm mt-1"><span>ITEM NUMBER :</span><span>{itemCount}</span></p>

      <div className="text-xs mt-3 text-center">
        <p>SCU INFORMATION</p>
        <p>DATE: {date}</p>
        <p>SCU ID: TAJIEATSKRA00100075878</p>
        <p>RECEIPT NUMBER: 161/161NS</p>
        <p>Internal Data: K2ZR-PE7S-LPGT-HKTW-XL7G-FV42-74</p>
        <p>Receipt Signature: HESE-4V1L-5AH7-5IPL</p>
        <p>INVOICE NUMBER: KRAETIMS0100075878/161</p>
        <p>Date: {date}</p>
        <p className="mt-2">End of Legal Receipt</p>
        <p className="font-semibold text-[10px]">Powered by ETIMS v1</p>
      </div>
    </div>
  );
});

export default Receipt;
