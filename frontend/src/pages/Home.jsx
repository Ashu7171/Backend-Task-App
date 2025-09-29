export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TaskApp</h1>
      <p className="text-lg text-gray-600 mb-8">
        A secure backend with role-based access and CRUD operations.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Backend Features</h2>
        <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700">
          <li>✅ JWT Authentication</li>
          <li>✅ User & Admin Roles</li>
          <li>✅ Task CRUD</li>
          <li>✅ MongoDB + Joi Validation</li>
        </ul>
      </div>
    </div>
  );
}