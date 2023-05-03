import { useState, useEffect } from "react";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        // define function to fetch and set our dashboard data
        async function fetchDashboardData() {
            const response = await fetch('http://localhost:4000/dashboard')
            const data = await response.json()
            // set dashboard data
            setDashboardData(data)
            // set loading to false
            setIsLoading(false)
        }
        // we now call the function we just defined
        fetchDashboardData()
        // since we want this function to run when this component mounts, we passed the empty [] as below.
    }, [])

    // if isloading is true, return a loading screen
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    // else return dashboard
    return (
        <div>
            <h2>Dashboard</h2>
            <h2>Posts - {dashboardData.posts}</h2>
            <h2>Likes - {dashboardData.likes}</h2>
            <h2>Followers - {dashboardData.followers}</h2>
            <h2>Following - {dashboardData.following}</h2>
        </div>
    )
}

export default Dashboard