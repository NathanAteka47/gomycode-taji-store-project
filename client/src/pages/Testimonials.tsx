const Testimonials = () => {
  const testimonials = [
    { name: "Grace W.", text: "Amazing care for my mum. Truly life-changing." },
    { name: "Peter M.", text: "Professional service and peaceful environment!" }
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-primary mb-12">What Our Clients Say</h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">“{t.text}”</p>
            <h4 className="mt-4 font-bold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
