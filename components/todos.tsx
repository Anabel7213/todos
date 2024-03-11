"use client"

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Todo {
    id: string
    user: string;
    todo: string;
    checked: boolean;
}
export default function Todos() {
    const { user } = useUser()
    function capitalizeFirstLetter(string: String) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const [ todos, setTodos ] = useState<Todo[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "todos"), where("user", "==", user?.id))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => {
                const { id, ...docData } = doc.data() as Todo;
                return {
                  id: doc.id, // Use the document ID from the snapshot
                  ...docData,
                  checked: docData.checked || false
                };
              });
            setTodos(data)
        }
        fetchData()
    }, [user, user?.id])
    const handleCheck = async (todoId: string, checked: boolean) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, checked: !checked };
            }
            return todo;
        });
        setTodos(updatedTodos);
    
        // Update Firebase
        const todoRef = doc(db, "todos", todoId);
        await updateDoc(todoRef, {
            checked: !checked
        });
    };
    useEffect(() => {
        const handleNewTodo = (e: any) => {
            setTodos((currentTodos) => [...currentTodos, e.detail]);
        };
        document.addEventListener('onNewTodo', handleNewTodo);
        return () => {
            document.removeEventListener('onNewTodo', handleNewTodo);
        };
    }, [user, user?.id]);
    return (
        <>
        <div className="flex flex-col gap-4 max-h-[200px] overflow-scroll w-full">
            {todos?.map((todo, i) => (
                <div key={i} className="flex justify-between gap-4 border-2 rounded-md border-yellow-dark p-3 w-full">
                   <h1 className={`${todo.checked && "line-through text-yellow-dark/50"} font-recoleta font-medium text-lg`}>{capitalizeFirstLetter(todo.todo)}</h1>
                   <div onClick={() => handleCheck(todo.id, todo.checked)} className="w-[24px] h-[24px] border-2 border-yellow-dark rounded-md shadow-yellow-dark relative cursor-pointer"><Image src="/checkmarks/check-yellow.svg" width={24} height={24} alt="Custom checkmark" className={todo.checked ? "ml-1" : "hidden"}/></div>
                </div>
            ))}

        </div>
        </>
    )
}