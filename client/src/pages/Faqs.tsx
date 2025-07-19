import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  { q: "Do I need a doctor's note to book?", a: "Not always, but it's recommended for medical stays." },
  { q: "Can I pay via M-Pesa?", a: "Yes. Pay to Till number 4455627 and paste the code on the booking form." },
  { q: "Do you offer emergency services?", a: "We support recovery, not emergency care. Contact your hospital first." },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-20 px-6 bg-white text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
            <div
              className="flex justify-between items-center"
              onClick={() => toggle(i)}
            >
              <h4 className="font-semibold text-blue-800 text-lg">{faq.q}</h4>
              {openIndex === i ? (
                <FaChevronUp className="text-blue-700" />
              ) : (
                <FaChevronDown className="text-blue-700" />
              )}
            </div>
            {openIndex === i && (
              <p className="text-gray-600 mt-2 transition-all duration-300 ease-in">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
