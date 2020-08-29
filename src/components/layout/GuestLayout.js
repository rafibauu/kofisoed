import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import Topbar from './components/Topbar'
import Footer from './components/Footer'
import CircularLoading from '../loading/circular'
import LazyComponentErrorBoundary from '../error/boundary'

const HomePage = React.lazy(() => import('../../pages/home'))
const SkillsPage = React.lazy(() => import('../../pages/skills'))
const AuthPage = React.lazy(() => import('../../pages/auth'))

const GuestLayout = () => {
  return (
    <>
      <Topbar />
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 64,
          paddingTop: 15,
          paddingBottom: 15
        }}
      >
        <LazyComponentErrorBoundary>
          <Suspense fallback={<CircularLoading />}>
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route path="/skills" render={() => <SkillsPage />} />
              <Route path="/auth/:type" component={AuthPage} />
            </Switch>
          </Suspense>
        </LazyComponentErrorBoundary>
      </main>
      <Footer />
    </>
  )
}

export default GuestLayout
