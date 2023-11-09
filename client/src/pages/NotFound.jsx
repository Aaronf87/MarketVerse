import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className = "bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 text-center min-h-screen">
    
            <h1 className="p-10 border-color:rgb(255 255 255); text-5xl text-rose-500">404 Page Not Found</h1>
            <button className="bg-indigo-700 p-3 rounded hover:bg-sky-700">
                <Link to="/">Go Home</Link>
            </button>
        </div>
    )
}