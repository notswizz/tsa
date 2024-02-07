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
    <div className="bg-base-200">
      <Head>
        <title>The Smith Agency</title>
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen py-10 px-4 text-center">
        <div className="hero bg-base-100 rounded-lg shadow-lg overflow-hidden">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src="/tsablack.png" alt="TSA Logo" className="rounded-full border-4 border-secondary w-32 h-32 mb-8 lg:mb-0" />
            <div>
              <h1 className="text-5xl font-bold">The Smith Agency</h1>
              <p className="py-6">Premiere Boutique Staffing</p>
              <ThemeSwitcher />
              <div className="flex gap-4 mt-6">
                <button onClick={toggleAvailabilityModal} className="btn btn-primary">Availability Form</button>
                <button onClick={toggleNewStaffFormModal} className="btn btn-secondary">Apply to TSA</button>
              </div>
            </div>
          </div>
        </div>

        {isAvailabilityOpen && <AvailabilityForm isOpen={isAvailabilityOpen} onClose={toggleAvailabilityModal} />}
        {isNewStaffFormOpen && <NewStaffForm isOpen={isNewStaffFormOpen} onClose={toggleNewStaffFormModal} />}
      </main>
    </div>
  );
}
