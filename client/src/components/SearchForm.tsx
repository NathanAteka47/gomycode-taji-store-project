import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = () => {
  const [location, setLocation] = useState("Nairobi");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  return (
    <div className="backdrop-blur-md bg-white/80 border border-blue-200 p-6 rounded-2xl shadow-2xl max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center mt-8">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or area"
          className="bg-white border rounded px-3 py-2 text-sm outline-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium">Check-in</label>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          placeholderText="Check-in"
          className="bg-white border rounded px-3 py-2 text-sm outline-blue-500"
          dateFormat="dd MMM yyyy"
          minDate={new Date()}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium">Check-out</label>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          placeholderText="Check-out"
          className="bg-white border rounded px-3 py-2 text-sm outline-blue-500"
          dateFormat="dd MMM yyyy"
          minDate={checkIn || new Date()}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500 font-medium">Patients</label>
        <select
          value={guests}
          onChange={(e) => setGuests(+e.target.value)}
          className="bg-white border rounded px-3 py-2 text-sm outline-blue-500"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1} Patient(s)</option>
          ))}
        </select>
      </div>

      <div className="text-center mt-4 md:mt-0">
        <button className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-full w-full hover:bg-blue-900 transition">
          🔎 Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
