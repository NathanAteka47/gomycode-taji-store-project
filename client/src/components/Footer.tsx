import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-red-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">Taji Eats</h2>
          <p className="text-sm text-gray-200 mb-4">
            Tradition Meets Modernity
            <br />
            Serving authentic Kenyan cuisine with a modern twist since 2023.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
          <p className="text-sm text-gray-200">
            Monday to Saturday: 7:30 am – 9:30 pm
            <br />
            Sunday: 9:30 am – 9:30 pm
            <br />
            Open all holidays
            <br />
            <br />
            <em>Reservations recommended for groups of 6+</em>
          </p>
        </div>

        {/* Contact & Location */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Visit Us</h3>

          {/* Kisumu Location */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-yellow-300 mb-1">
              Kisumu Branch
            </h4>
            <p className="text-sm text-gray-200 flex items-start gap-2 mb-1">
              <FaMapMarkerAlt className="mt-1" />
              Nyerere Road, Adjacent to Taji House,
              <br />
              Opposite Makini School
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/share/19SeL4ZVPT/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/tajithreeinone?igsh=MXJkaGU0azBkdmlmYQ==&utm_source=ig_contact_invite"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/254713195195"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@tajithreeinone?_r=1&_d=eh9d0ghfj5e1ag&sec_uid=MS4wLjABAAAA3c9OgqDZ6va5L3_wGvrAd6zqdYgEsYT2gGrbMq1E5947bg0DGxKX9T6DneA4wGqT&share_author_id=7519806384972923909&sharer_language=en&source=h5_m&u_code=el35dfff2hhg9d&timestamp=1750841922&user_id=7519806384972923909&sec_user_id=MS4wLjABAAAA3c9OgqDZ6va5L3_wGvrAd6zqdYgEsYT2gGrbMq1E5947bg0DGxKX9T6DneA4wGqT&utm_source=whatsapp&utm_campaign=client_share&utm_medium=android&share_iid=7515853134267877176&share_link_id=8d885431-dc55-4d95-beb5-db1e05aa1143&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2CEnlargeAvatarActivity&social_share_type=5&enable_checksum=1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Bungoma Location */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-yellow-300 mb-1">
              Bungoma Branch
            </h4>
            <p className="text-sm text-gray-200 flex items-start gap-2 mb-1">
              <FaMapMarkerAlt className="mt-1" />
              250m from Mumias-Bungoma Rd,
              <br />
              Behind Governor's Office
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/share/19SeL4ZVPT/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/tajithreeinone?igsh=MXJkaGU0azBkdmlmYQ==&utm_source=ig_contact_invite"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/254718451567"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@tajithreeinone?_r=1&_d=eh9d0ghfj5e1ag&sec_uid=MS4wLjABAAAA3c9OgqDZ6va5L3_wGvrAd6zqdYgEsYT2gGrbMq1E5947bg0DGxKX9T6DneA4wGqT&share_author_id=7519806384972923909&sharer_language=en&source=h5_m&u_code=el35dfff2hhg9d&timestamp=1750841922&user_id=7519806384972923909&sec_user_id=MS4wLjABAAAA3c9OgqDZ6va5L3_wGvrAd6zqdYgEsYT2gGrbMq1E5947bg0DGxKX9T6DneA4wGqT&utm_source=whatsapp&utm_campaign=client_share&utm_medium=android&share_iid=7515853134267877176&share_link_id=8d885431-dc55-4d95-beb5-db1e05aa1143&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2CEnlargeAvatarActivity&social_share_type=5&enable_checksum=1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* General Contact */}
          <ul className="text-sm text-gray-200 space-y-2">
            <li className="flex items-center gap-2">
              <FaPhone /> 0713 195 195
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> tajieats@tajithreeinone.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-xs text-gray-400 border-t border-red-700 pt-4">
        &copy; {new Date().getFullYear()} Taji Eats. All Rights Reserved.
      </div>
    </footer>
  );
}
