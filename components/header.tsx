"use client"

import { usePathname, useRouter } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const items = [
        {
            name: pathname === "/about" ? "Home" : "About",
            onClick: () => router.push(pathname === "/about" ? "/" : "/about")
        },
        {
            name: "Go random",
            onClick: () => {}
        }
    ]
    return (
        <>
        <div className="p-4 w-full justify-center items-center flex gap-4">
            {items.map((item, i) => (
                <button key={i} onClick={item.onClick} className="rounded-md hover:shadow-none transition-all p-3 w-[116px] border-2 shadow-custom border-black">{item.name}</button>
            ))}
        </div>
        </>
    )
}