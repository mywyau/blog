import { useParams } from "@remix-run/react"

export default function DashboardId() {

    const { id } = useParams()

    return (
        <div>
            <h1>Hello from the Id page: {id}</h1>
        </div>
    )
}