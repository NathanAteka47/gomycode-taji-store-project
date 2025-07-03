// client/src/components/WorkerList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Worker {
  _id: string;
  name: string;
  jobTitle: string;
  workerId: string;
  picture: string;
}

export default function WorkerList() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/workers')
      .then(res => setWorkers(res.data))
      .catch(err => {
        console.error('Failed to fetch workers', err);
        setWorkers([]);
      });
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Restaurant Workers</h2>
      {workers.length === 0 ? (
        <p className="text-gray-600">No workers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workers.map(worker => (
            <div key={worker._id} className="bg-white shadow-md border rounded-lg p-4 text-center">
              <img
                src={worker.picture}
                alt={worker.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-3 border-2 border-red-800"
              />
              <h3 className="text-lg font-semibold text-red-900">{worker.name}</h3>
              <p className="text-sm text-gray-600">ID: {worker.workerId}</p>
              <p className="text-sm font-medium text-red-700">{worker.jobTitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
