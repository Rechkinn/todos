import "./Priority.scss";
import Loader from "../Loader/Loader.jsx";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../myFirebase.js";

export default function Priority({ priorityId, modifierInitial = "high" }) {
  const [loading, setLoading] = useState(false);
  const [modifier, setModifier] = useState(modifierInitial);

  async function updatePriority(idPriority, priority) {
    try {
      setLoading(true);
      const ref = doc(db, "todos", idPriority);
      await updateDoc(ref, {
        priority: priority,
        updatedAt: `${new Date()
          .toLocaleTimeString()
          .slice(0, 5)} - ${new Date().toLocaleDateString()}`,
      });
    } catch (error) {
      alert("Error update. ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function changeModifier(mod) {
    if (mod === "high") {
      setModifier("medium");
      updatePriority(priorityId, "medium");
    } else if (mod === "medium") {
      setModifier("low");
      updatePriority(priorityId, "low");
    } else if (mod === "low") {
      setModifier("high");
      updatePriority(priorityId, "high");
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="priority">
        <button
          data-todo-id={priorityId}
          className={"priority__inner priority_" + modifier}
          onClick={(event) => {
            event.preventDefault();
            changeModifier(modifier);
          }}
        >
          {modifier}
        </button>
      </div>
    </>
  );
}
