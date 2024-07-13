import { Outlet } from "@remix-run/react"

export default function Dashboard() {

    return (
        <div>
            <h1>H1 Mikey</h1>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
                <div className="shrink-0">
                    <p>Paragraph</p>
                </div>
                <div>
                    <div className="text-xl font-medium text-black">ChitChat</div>
                    <p className="text-slate-500">You have a new message!</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}