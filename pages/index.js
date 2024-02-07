import Head from 'next/head';
import React, { useState } from 'react';
import AvailabilityForm from '../components/AvailabilityForm';
import NewStaffForm from '../components/NewStaffForm';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Home() {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isNewStaffFormOpen, setIsNewStaffFormOpen] = useState(false);

  const toggleAvailabilityModal = () => setIsAvailabilityOpen(!isAvailabilityOpen);
  const toggleNewStaffFormModal = () => setIsNewStaffFormOpen(!isNewStaffFormOpen);

  return (
    <div>
      <Head>
        <title>The Smith Agency</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <img src="/tsablack.png" alt="TSA Logo" className="rounded-full border-4 border-secondary w-24 h-24" />
        <h1 className="text-5xl font-bold mb-4">The Smith Agency</h1>
        <p className="text-lg mb-8">Premiere Boutique Staffing</p>
        
        <ThemeSwitcher />

        <div className="flex gap-4 mb-8">
          <button onClick={toggleAvailabilityModal} className="btn btn-primary"> Availability Form</button>
          <button onClick={toggleNewStaffFormModal} className="btn btn-secondary">Apply to TSA</button>
        </div>

        {isAvailabilityOpen && <AvailabilityForm isOpen={isAvailabilityOpen} onClose={toggleAvailabilityModal} />}
        {isNewStaffFormOpen && <NewStaffForm isOpen={isNewStaffFormOpen} onClose={toggleNewStaffFormModal} />}
      </main>
    </div>
  );
}
