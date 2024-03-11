import Link from "next/link"

export default function About() {
    const items = [
        {
            name: "Portfolio",
            href: "https://www.davinci.llc"
        },
        {
            name: "Github",
            href: "https://github.com/Anabel7213?tab=repositories"
        },
        {
            name: "LinkedIn",
            href: "/https://www.linkedin.com/in/anastasia-bielievitina-b20396259/"
        }
    ]
    const paragraphs = [
        "Hey there! I'm Anabel, a self-taught full-stack developer and web designer with a keen eye for creating user experiences that are not only accessible and clutter-free, but also packed with personality and charm.",
        "Programming lets me bring my wildest ideas to life and make a real difference in people's lives. It's the ultimate creative outlet, where I get to call all the shots and make my vision a reality.",
        "When I create, I pour my heart and soul into it, making sure every interaction is unique, valuable, and memorable. Check out my portfolio for a taste of what I can do :)"
    ]
    return (
        <>
        <div className="flex mt-4 mx-auto p-4 justify-center items-center">
            <div className="border-yellow-dark min-h-[200px] w-full md:w-[664px] text-yellow-dark border-2 rounded-md p-8 bg-yellow flex flex-col justify-center items-center gap-4">
                <h1 className="font-recoleta text-2xl font-semibold">About</h1>
                {paragraphs.map((item, i) => (
                    <p className="text-lg font-recoleta text-yellow-dark" key={i}>{item}</p>
                ))}
                <div className="flex flex-col text-lg text-yellow-dark gap-4 w-full text-center">
                    {items.map((item, i) => (
                        <Link href={item.href} key={i} type="submit" className="font-recoleta border-2 hover:shadow-none font-medium transition-all border-yellow-dark rounded-md shadow-yellow-dark p-3 text-lg w-full">{item.name}</Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}