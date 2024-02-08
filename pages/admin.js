// pages/admin.js
import Head from 'next/head';
import AddShowForm from '../components/AddShowForm';
import { useState } from 'react';

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button onClick={toggleModal} className="btn btn-primary my-4">Add New Show</button>
      <AddShowForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </main>
    </div>
    </>
  );
}