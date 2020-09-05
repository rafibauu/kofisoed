import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import Topbar from './components/Topbar'
import Footer from './components/Footer'
import CircularLoading from '../loading/circular'
import LazyComponentErrorBoundary from '../error/boundary'

const HomePage = React.lazy(() => import('../../pages/home'))
const SkillsPage = React.lazy(() => import('../../pages/skills'))
const CareerPage = React.lazy(() => import('../../pages/career'))
const MarketplacePage = React.lazy(() => import('../../pages/marketplace'))
const AboutPage = React.lazy(() => import('../../pages/about'))
const AuthPage = React.lazy(() => import('../../pages/auth'))

const GuestLayout = () => {
  return (
    <>
      <Topbar />
      <main
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 64
        }}
      >
        <LazyComponentErrorBoundary>
          <Suspense fallback={<CircularLoading />}>
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route path="/skills" render={() => <SkillsPage />} />
              <Route path="/career" render={() => <CareerPage />} />
              <Route path="/marketplace" render={() => <MarketplacePage />} />
              <Route path="/about" render={() => <AboutPage />} />
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
