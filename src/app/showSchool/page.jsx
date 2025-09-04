"use client";
import { useState, useEffect } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  if(schools.length === 0) {
    return <p className="text-center text-3xl text-slate-600">No schools available.</p>;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-balance">
        Schools Directory
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={school.image || "/placeholder.svg"}
                alt={school.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                {school.name}
              </h2>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {school.address}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {school.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
