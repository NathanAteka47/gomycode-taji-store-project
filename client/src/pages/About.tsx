// const About = () => {
//   return (
//     <section className="bg-gray-50 py-20 px-6">
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-primary mb-6">About Mediquick Stays</h2>
//         <p className="text-gray-700 text-lg mb-10">
//           Mediquick Stays was founded by a compassionate doctor with a mission to bridge the gap between healthcare and homely comfort. We provide medical accommodation that supports patients and caregivers with dignity and care.
//         </p>
//                 <h2 className="text-4xl font-bold text-primary mb-6">Our Vision</h2>
//         <p className="text-gray-700 text-lg mb-10">
//           To be the leading provider of medical accommodation and end to end medical travel and tourism provider that seamlessly integrates comfort, care, and convenience for optimal wellness.        </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-primary">Our Mission</h3>
//             <p className="text-gray-700">
//               Our mission is to offer a _Home Away from Home_ haven towards complete healing and rejuvenation of body, mind and soul.            </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-primary">Our Values</h3>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>Compassion</li>
//               <li>Integrity</li>
//               <li>Medical Excellence</li>
//               <li>Patient Dignity</li>
//               <li>Caregiver Support</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

const About = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-6">
          About <span className="text-primary">Mediquick Stays</span>
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Providing compassionate, home-based medical recovery in Kenya through licensed professionals and peaceful spaces.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To enhance recovery through personalized care in homely environments — medically supervised and designed for peace of mind.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-blue-800">Our Core Values</h3>
            <ul className="list-disc ml-6 space-y-1 text-gray-600">
              <li>Compassionate Service</li>
              <li>Medical Integrity</li>
              <li>Patient-Centered Healing</li>
              <li>Dignity & Respect</li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="flex flex-col items-center">
            <img
              src="/doctor-profile.png"
              alt="Doctor Jane Mwangi"
              className="w-full max-w-sm rounded-lg shadow-md object-cover"
              onError={(e) => {
                // fallback to placeholder if image not found
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Doctor+Photo';
              }}
            />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Founder: <strong>Dr. Jane Mwangi</strong> (MBChB, MMed) – Consultant Physician
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
