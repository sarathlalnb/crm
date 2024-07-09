import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DeveloperSettings = React.lazy(() => import('./views/settings/developerSettings/DeveloperSettings'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/modules', name:'Modules',element: DeveloperSettings},
]

export default routes
