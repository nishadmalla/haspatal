import React, { useState, useEffect } from "react";
import { DoctorsCard } from "../../import-export/ImportExport";

function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  // Hardcoded doctor data
  const hardcodedDoctors = [
    {
      _id: 1, // Adding _id to match the key prop requirement
      docAvatar: "/new_hero.png", // Replace with the correct path to your image
      firstName: "John",
      lastName: "Doe",
      department: { name: "Cardiology" },
      experience: "10 years",
      qualifications: ["MBBS", "MD"],
      appointmentCharges: 500,
      languagesKnown: ["English", "Hindi"],
    },
    {
      _id: 2,
      docAvatar: "/new_hero.png",
      firstName: "Jane",
      lastName: "Smith",
      department: { name: "Dermatology" },
      experience: "8 years",
      qualifications: ["MBBS", "MD"],
      appointmentCharges: 600,
      languagesKnown: ["English", "Spanish"],
    },
    {
      _id: 3,
      docAvatar: "/new_hero.png",
      firstName: "Alice",
      lastName: "Johnson",
      department: { name: "Pediatrics" },
      experience: "12 years",
      qualifications: ["MBBS", "MD"],
      appointmentCharges: 450,
      languagesKnown: ["English", "French"],
    },
  ];

  // Simulate loading data (optional)
  useEffect(() => {
    // Simulate a delay to mimic an API call
    const timer = setTimeout(() => {
      setDoctors(hardcodedDoctors);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="w-full">
      <section className="my-20 h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-between px-3 md:px-6 lg:px-6 py-2">
        {/* Search doctors component */}
        {/* You can add a search bar here if needed */}

        {/* Doctors components */}
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorsCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center col-span-full">Loading doctors...</p>
        )}
      </section>
    </div>
  );
}

export default AllDoctorsPage;