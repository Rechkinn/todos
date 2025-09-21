import "./Content.scss";
import Todo from "../Todo/Todo";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import Loader from "../Loader/Loader.jsx";
import Notification from "../Notification/Notification.jsx";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../myFirebase.js";

export default function Content() {
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [activePanel, setActivePanel] = useState("primary");
  const [optionActive, setOptionActive] = useState("All");
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [arrayForRender, setArrayForRender] = useState([]);
  const [notification, setNotification] = useState("");
  const [isAccessTokenUser, setIsAccessTokenUser] = useState(
    localStorage.getItem("accessToken") ? true : false
  );

  useEffect(() => {
    let mounted = true;
    if (!uid) return;

    async function load() {
      setLoading(true);
      try {
        const items = await getTodos(uid);
        if (mounted) setArrayForRender(items);
      } catch (error) {
        alert(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [uid]);

  let json = {
    option: localStorage.getItem("todos")
      ? localStorage.getItem("todos")
      : "All",
  };

  async function getTodos(uid) {
    if (!uid) return [];
    try {
      const q = query(collection(db, "todos"), where("userId", "==", uid));
      const snap = await getDocs(q);
      setArrayForRender(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (error) {
      alert(`${error}`);
      throw error;
    }
  }
  async function addTask() {
    try {
      setLoading(true);
      const inputAddToDo = document.querySelector(".input_add-todo");
      const date = `${new Date()
        .toLocaleTimeString()
        .slice(0, 5)} - ${new Date().toLocaleDateString()}`;
      const generateId = `${Math.random()}`.slice(2);
      const newToDo = {
        id: generateId,
        description: inputAddToDo.value,
        completed: false,
        priority: "high",
        createdAt: date,
        updatedAt: date,
        userId: uid,
        option: "Active",
      };

      const ref = doc(db, "todos", `${generateId}`);
      await setDoc(ref, newToDo);
      setArrayForRender(await getTodos(uid));
      setNotification("success");
    } catch (error) {
      setNotification(`${error}`);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 5000);
      setLoading(false);
    }
  }
  async function choiceOption(option) {
    try {
      setLoading(true);

      const ref = collection(db, "todos");
      const constraints = [where("userId", "==", uid)];
      if (option !== "All") constraints.push(where("option", "==", option));
      const q = query(ref, ...constraints);
      const snap = await getDocs(q);
      const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setArrayForRender(todos);
    } catch (error) {
      alert("Error choice option. ", error);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  async function findTask() {
    try {
      setLoading(true);

      const inputToFindTodo = document.querySelector(".input_add-todo");
      const q = query(collection(db, "todos"), where("userId", "==", uid));
      const snap = await getDocs(q);
      const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const filtered = todos.filter((todo) =>
        todo.description?.startsWith(inputToFindTodo.value)
      );

      setArrayForRender(filtered);
      setNotification("success");
    } catch (error) {
      setNotification(`${error}`);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  }

  function selectOption(selectElement) {
    for (let i = 0; i < selectElement.children.length; i++) {
      if (!selectElement.children[i].selected) continue;

      json = JSON.parse(localStorage.getItem("todos"));
      json.option = selectElement.children[i].label;
      localStorage.setItem("todos", JSON.stringify(json));

      choiceOption(json.option);
      setOptionActive(selectElement.children[i].label);
      break;
    }
  }
  function renderActivePanel() {
    if (activePanel === "primary") {
      return (
        <div className="filter__primary">
          <div className="filter__buttons">
            <div className="filter__button-create">
              <Button
                onClick={() => {
                  setActivePanel("add");
                }}
                styleClasses={
                  "button button_purple button_create-task button_w100"
                }
                disabled={!isAccessTokenUser}
              >
                Create task
              </Button>
            </div>
            <div className="filter__button-find">
              <Button
                onClick={() => {
                  setActivePanel("find");
                }}
                styleClasses={
                  "button button_purple button_create-task button_w100"
                }
                disabled={!isAccessTokenUser}
              >
                Find task
              </Button>
            </div>
          </div>

          <div className="filter__div-select">
            <select
              name=""
              id=""
              className="filter__select"
              defaultValue={optionActive}
            >
              <option value="All" className="filter__option">
                All
              </option>
              <option value="Completed" className="filter__option">
                Completed
              </option>
              <option value="Active" className="filter__option">
                Active
              </option>
            </select>
          </div>
        </div>
      );
    } else if (activePanel === "add") {
      return (
        <div className="filter__content">
          <div className="filter__div-select filter__div-select_panel-add">
            <select
              name=""
              id=""
              className="filter__select"
              defaultValue={optionActive}
            >
              <option value="All" className="filter__option">
                All
              </option>
              <option value="Completed" className="filter__option">
                Completed
              </option>
              <option value="Active" className="filter__option">
                Active
              </option>
            </select>
          </div>
          <div className="filter__add">
            <div className="filter__input">
              <Input
                placeholder={"Enter your task"}
                styleClasses={"input input_add-todo"}
              />
            </div>
            <div className="filter__button-add">
              <Button
                onClick={() => {
                  checkError();
                }}
                styleClasses={"button button_purple button_add-task"}
              >
                Add task
              </Button>
            </div>
            <div className="filter__button-add">
              <Button
                onClick={() => {
                  setActivePanel("primary");
                }}
                styleClasses={"button button_red button_close-task"}
              ></Button>
            </div>
          </div>
          {showError && (
            <div className="filter__error">
              <p className="filter__message">Введите хотя бы один символ!</p>
            </div>
          )}
        </div>
      );
    } else if (activePanel === "find") {
      return (
        <div className="filter__content">
          <div className="filter__div-select filter__div-select_panel-add">
            <select
              name=""
              id=""
              className="filter__select"
              defaultValue={optionActive}
            >
              <option value="All" className="filter__option">
                All
              </option>
              <option value="Completed" className="filter__option">
                Completed
              </option>
              <option value="Active" className="filter__option">
                Active
              </option>
            </select>
          </div>
          <div className="filter__add">
            <div className="filter__input">
              <Input
                placeholder={
                  "Enter the beginning of the task you are looking for"
                }
                styleClasses={"input input_add-todo"}
              />
            </div>
            <div className="filter__button-add">
              <Button
                onClick={() => {
                  // checkError("find");
                  setActivePanel("primary");
                  findTask();
                }}
                styleClasses={"button button_purple button_add-task"}
              >
                Find task
              </Button>
            </div>
            <div className="filter__button-add">
              <Button
                onClick={() => {
                  setActivePanel("primary");
                }}
                styleClasses={"button button_red button_close-task"}
              ></Button>
            </div>
          </div>
        </div>
      );
    }
  }
  function checkError() {
    if (document.querySelector(".input_add-todo").value !== "") {
      setShowError(false);
      setActivePanel("primary");
      addTask();
    } else {
      setShowError(true);
    }
  }
  function renderTodos(array) {
    if (array.length == 0) {
      return (
        <p className="list__message-empty-list">
          <span className="list__message-empty-list-text">
            Your tasks will be here
          </span>
        </p>
      );
    } else {
      return array.map((todo) => {
        if (optionActive === "All" || optionActive === todo.option) {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              body={todo.description}
              isChecked={todo.completed}
              priority={todo.priority}
              dataCreatedAt={todo.createdAt}
              dataUpdatedAt={todo.updatedAt}
            />
          );
        }
      });
    }
  }

  document.addEventListener("updateTodos", () => getTodos(uid));
  document.addEventListener("successSignIn", () => setIsAccessTokenUser(true));
  document.addEventListener("logOut", () => setIsAccessTokenUser(false));
  document.addEventListener("click", (event) => {
    if (event.target.closest(".filter__select")) {
      selectOption(event.target);
    }
  });
  document.addEventListener("renderPanelAdd", () => {
    setActivePanel("primary");
  });

  return (
    <main>
      {loading && <Loader />}
      {notification === "success" && (
        <Notification
          modifier={notification}
          text={"The operation was completed successfully!"}
        />
      )}
      {notification !== "success" && notification !== "" && (
        <Notification
          modifier={"fall"}
          text={"An error occurred while performing the operation!"}
        />
      )}
      <div className="filter">
        <div className="filter__inner">{renderActivePanel()}</div>
      </div>
      <div className="list">
        <div className="list__inner">{renderTodos(arrayForRender)}</div>
      </div>
      <Button />
    </main>
  );
}
