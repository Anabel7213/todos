"use client"

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Todos from "./todos";
import { uuid } from 'uuidv4';
import toast from "react-hot-toast";

interface Todo {
    id: string;
    user: string;
    todo: string;
    checked: boolean;
  }

export default function Card() {
    const { user } = useUser()
    const [ todo, setTodo ] = useState({
        id: uuid(),
        user: user?.id || null,
        todo: "",
    })
    const date = new Date().toLocaleDateString("en-US", {weekday: "short", month: "long", day: "numeric" })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!todo.todo.trim()) return;
        if (!user?.id) {
            console.error('User ID is undefined, cannot add todo.');
            return; // Early return if user ID is undefined
        }
        try {
            const newDocRef = await addDoc(collection(db, "todos"), {
                user: user?.id,
                todo: todo.todo,
                checked: false
            });
            setTodo({ ...todo, todo: "" });
            const newTodo = {
                id: newDocRef.id,
                user: user?.id,
                todo: todo.todo,
                checked: false,
            };
            document.dispatchEvent(new CustomEvent('onNewTodo', { detail: newTodo }));
            toast.success('Added!', {
                style: {
                  border: '2px solid #000000',
                  backgroundColor: "#EFD4DC",
                  padding: '16px',
                  color: '#000000',
                },
                iconTheme: {
                  primary: '#000000',
                  secondary: '#EFD4DC',
                },
              });
        } catch(err) {
            console.log("Error adding a todo to the database:", err);
        }
    };
    
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(prevState => ({
            ...prevState,
            todo: e.target.value,
        }));
    };
    const [todos, setTodos] = useState<Todo[]>([]);
    const onDelete = async () => {
        if (!user?.id) {
            console.error("User ID is undefined.");
            return;
        }
    
        console.log(`Deleting todos for user: ${user.id}`);
        console.log(`Current todos:`, todos);
    
        const userTodos = todos.filter((todo) => todo.user === user.id);
        console.log(`Todos to delete:`, userTodos);
    
        const deletionPromises = userTodos.map((todo) => {
            const docRef = doc(db, "todos", todo.id);
            return deleteDoc(docRef);
        });
    
        try {
            await Promise.all(deletionPromises);
            console.log("User's todos have been deleted");
            setTodos((currentTodos) => currentTodos.filter((todo) => !userTodos.some((ut) => ut.id === todo.id)));
        } catch (err) {
            console.error("Error deleting user's todos:", err);
        }
    };
    
    
    return (
        <>
        <div className="border-yellow-dark min-h-[200px] w-full md:w-[500px] text-yellow-dark border-2 rounded-md p-8 bg-yellow flex flex-col justify-center items-center gap-4">
            <h1 className="font-recoleta text-2xl font-semibold">{date}</h1>
            <Todos />
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <input value={todo?.todo} onChange={handleTodoChange} placeholder="What do you want to tackle?" className="border-b text-center text-yellow-dark font-recoleta text-lg placeholder:text-yellow-dark/50 w-full border-yellow-dark outline-none bg-transparent p-3"/>
                <button type="submit" className="font-recoleta border-2 hover:shadow-none font-medium transition-all border-yellow-dark rounded-md shadow-yellow-dark p-3 text-lg w-full">Create</button>
                <button onClick={onDelete} className="font-recoleta self-center text-lg text-yellow-dark hover:border-yellow-dark border-transparent transition-all border-b-2">Delete all</button>
            </form>
        </div>
        </>
    )
}