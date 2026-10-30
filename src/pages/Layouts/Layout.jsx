import React from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
        <nav>
            <ul>
                <li>Home</li>
                <li>Create</li>
                <li>Search</li>
            </ul>
        </nav>
    {/* Dynamin router changes content */}
        <Outlet></Outlet>
    </div>
  )
}
