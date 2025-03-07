import React, { useState, useEffect } from "react";
import { parse, format, subMinutes, addMinutes, isWithinInterval } from "date-fns";

const MedicineReminder = () => {
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("medicineReminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const [medicineName, setMedicineName] = useState("");
  const [reminderTime, setReminderTime] = useState("20:00");
  const [showNotification, setShowNotification] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);

  // Save reminders to localStorage on every update
  useEffect(() => {
    localStorage.setItem("medicineReminders", JSON.stringify(reminders));
  }, [reminders]);

  // Request Notification Permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().catch((err) => console.warn("Notification error:", err));
    }
  }, []);

  // Check reminders at set intervals
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          let reminderTimeObj = parse(reminder.time, "HH:mm", new Date());
          reminderTimeObj.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

          const startWindow = subMinutes(reminderTimeObj, 1);
          const endWindow = addMinutes(reminderTimeObj, 1);

          if (isWithinInterval(now, { start: startWindow, end: endWindow }) && !reminder.active) {
            triggerReminder(reminder);
            return { ...reminder, active: true };
          }
          return reminder;
        })
      );
    };

    checkReminders();
    const intervalId = setInterval(checkReminders, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Trigger Reminder
  const triggerReminder = (reminder) => {
    setCurrentReminder(reminder);
    setShowNotification(true);

    // Show notification only if permission is granted
    if (Notification.permission === "granted") {
      try {
        new Notification("Medicine Reminder", {
          body: `Time to take: ${reminder.medicineName}`,
          icon: "/notification-icon.png",
        });
      } catch (error) {
        console.error("Notification Error:", error);
      }
    }

    // Use SpeechSynthesis if supported
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(
        `It's time to take your medicine: ${reminder.medicineName}`
      );
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    }

    setTimeout(() => setShowNotification(false), 10000);
  };

  // Add Reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!medicineName.trim() || !reminderTime) {
      alert("Please enter both medicine name and time");
      return;
    }

    const newReminder = {
      id: Date.now().toString(),
      medicineName: medicineName.trim(),
      time: reminderTime,
      active: false,
    };

    setReminders((prev) => [...prev, newReminder]);
    setMedicineName("");
    setReminderTime("20:00");
  };

  // Delete Reminder
  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Medicine Reminder
        </h2>

        <form className="space-y-4" onSubmit={handleAddReminder}>
          <div>
            <label className="block text-gray-600 text-sm mb-1" htmlFor="medicineName">
              Medicine Name
            </label>
            <input
              type="text"
              id="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1" htmlFor="reminderTime">
              Reminder Time
            </label>
            <input
              type="time"
              id="reminderTime"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Reminder
          </button>
        </form>

        <h3 className="text-lg font-semibold mt-6 text-gray-700">Your Reminders</h3>
        <div className="mt-2 space-y-2">
          {reminders.length === 0 ? (
            <p className="text-gray-500">No reminders set. Add one above.</p>
          ) : (
            reminders.map((reminder) => (
              <div key={reminder.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                <div>
                  <div className="text-gray-800 font-medium">{reminder.medicineName}</div>
                  <div className="text-gray-500 text-sm">
                    {format(parse(reminder.time, "HH:mm", new Date()), "h:mm a")}
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white p-1 px-3 rounded text-sm hover:bg-red-600"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {showNotification && currentReminder && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
            <h3 className="font-bold">Medicine Reminder</h3>
            <p>It's time to take: {currentReminder.medicineName}</p>
            <button
              onClick={() => setShowNotification(false)}
              className="mt-2 bg-white text-blue-500 p-1 rounded text-sm hover:bg-gray-100"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineReminder;
