import { useState, useEffect } from "react";
//import "./App.css";

function Dashboard({ handleLogout }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔹 FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/potential_customers");
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 GENERATE CUSTOMERS
  const generateCustomers = async () => {
    try {
      await fetch("http://localhost:5000/generate-customers", {
        method: "POST",
      });
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/potential_customers/${id}`, {
        method: "DELETE",
      });
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/potential_customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 ADD NOTE
  const addNote = async () => {
    if (!selectedCustomer || !newNote) return;

    try {
      await fetch(
        `http://localhost:5000/potential_customers/${selectedCustomer._id}/notes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ note: newNote }),
        }
      );

      setNewNote("");
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 STATUS COLORS
  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-gray-200 text-gray-700";
      case "contacted":
        return "bg-blue-200 text-blue-700";
      case "converted":
        return "bg-green-200 text-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">

      {/* HEADER */}
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

  <h1 className="text-2xl font-bold">
    CRM Dashboard 📊
  </h1>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex gap-2">

    <button
      onClick={generateCustomers}
      className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
    >
      Generate Customers
    </button>

    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
    >
      Logout
    </button>

  </div>

</header>

      <main className="p-6">

        <div className="bg-white rounded-xl shadow p-6">

          {/* HEADER ROW */}
          <div className="border-b border-gray-800 pb-2 mb-4">
            <div className="grid grid-cols-6 font-semibold text-gray-700">
              <span>Name</span>
              <span>Email</span>
              <span>Source</span>
              <span>Status</span>
              <span className="text-center">Notes</span>
              <span className="text-right">Action</span>
            </div>
          </div>

          {/* DATA ROWS */}
          {customers.map((c) => (
            <div
              key={c._id}
              className="grid grid-cols-6 py-2 text-sm items-center"
            >
              <span>{c.name}</span>
              <span>{c.email}</span>
              <span>{c.source}</span>

              {/* STATUS */}
              <select
                value={c.status}
                onChange={(e) =>
                  handleStatusChange(c._id, e.target.value)
                }
                className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                  c.status
                )}`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>

              {/* NOTES BUTTON (CENTERED FIX) */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedCustomer(c)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  View / Add Notes
                </button>
              </div>

              {/* DELETE BUTTON (RIGHT FIX) */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-1 text-lg rounded-full hover:bg-gray-200 transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* NOTES MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-96">

            <h2 className="text-lg font-bold mb-3">
              Notes - {selectedCustomer.name}
            </h2>

            {/* NOTES LIST */}
            <div className="border p-2 h-32 overflow-y-auto mb-3">
              {selectedCustomer.notes?.length > 0 ? (
                selectedCustomer.notes.map((n, i) => (
                  <p key={i} className="text-sm border-b py-1">
                    {n}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No notes yet</p>
              )}
            </div>

            {/* INPUT */}
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full border p-2 text-sm mb-2"
              placeholder="Write a note..."
            />

            <div className="flex justify-between">

              <button
                onClick={addNote}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
              >
                Add Note
              </button>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 text-sm"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;