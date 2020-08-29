import React from 'react'
import PropTypes from 'prop-types'
import { isLoaded } from 'react-redux-firebase'

export const getTestIdBySlug = (slug) => {
  const testIds = {
    'subtest-1': 1,
    'subtest-2': 2,
    'subtest-3': 3,
    'subtest-4': 4,
    'subtest-5': 5,
    'berhitung-angka': 6,
    'gabungan-bagian': 7,
    'hubungan-kata': 8,
    'abstraksi-non-verbal': 9,
    'work-personality-analytics': 10,
    'work-behavioural-assessment': 11,
    tma: 12,
    qutest: 13
  }
  return testIds[slug]
}

const Subtest = (WrappedComponent) => {
  const Component = (props) => {
    function getUsersAuth() {
      const { appAuth, dashboard } = props
      return { ...appAuth.user, ...dashboard.user }
    }

    function getUsersProject() {
      const { dashboard } = props
      return dashboard.project
    }

    function getUsersTest() {
      const { dashboard } = props
      return dashboard.project.items
    }

    function getUsersSession() {
      const { session } = props
      const { uuid } = getUsersAuth()
      return session[uuid]
    }

    function getUsersMapping() {
      const { dashboard } = props
      const { usersMapping } = dashboard
      const usersCount = Object.keys(usersMapping).length
      return { usersCount, usersMapping }
    }

    function getUsersRawStatus() {
      const { rawStatus } = props
      const { uuid } = getUsersAuth()
      return rawStatus ? rawStatus[uuid] : {}
    }

    function getUsersRawInput() {
      const { rawInput } = props
      const { uuid } = getUsersAuth()
      return rawInput[uuid]
    }

    function getAssessmentFinishedStatus() {
      const usersTest = getUsersTest()
      return usersTest.every((test) => test.status === 1)
    }

    function getFirstTest() {
      const usersTest = getUsersTest()
      return usersTest[0]
    }

    function getNextTest() {
      const usersTest = getUsersTest()
      return usersTest.find((test) => test.status === 0)
    }

    function getLastTest() {
      const usersTest = getUsersTest()
      return usersTest[usersTest.length - 1]
    }

    function getActiveTestSlug() {
      const { match } = props
      return match.params.slug
    }

    function getActiveTest() {
      const activeTestSlug = getActiveTestSlug()
      const usersTest = getUsersTest()
      let activeIndex = 0
      const activeTest = usersTest.find((test, index) => {
        activeIndex = index
        return test.slug === activeTestSlug
      })
      return { activeIndex, activeTest }
    }

    function getActiveRawStatus() {
      const rawStatus = getUsersRawStatus()
      const { activeTest } = getActiveTest()
      if (!rawStatus) return null
      const activeRawStatus = rawStatus[activeTest.test_id]
      return activeRawStatus || null
    }

    function getActiveRawInputStats(allRawInput, activeTest) {
      if (!allRawInput) {
        return { totalTimeTaken: 0, totalAnswered: 0, totalSaved: 0 }
      }
      const { test_id: testId } = activeTest
      const { soal: questions } = props
      const activePackage = questions[testId]
      const rawInputKeys = Object.keys(allRawInput)
      let totalTimeTaken = 0
      let totalAnswered = 0
      let totalSaved = 0
      rawInputKeys.map((key) => {
        const rawInput = allRawInput[key]
        totalSaved += 1
        totalTimeTaken += rawInput.timer
        const answer = rawInput.jawaban
        if (answer !== '') {
          const countAnswer = Object.keys(answer).length
          if (countAnswer === activePackage.minAnswer) {
            totalAnswered += 1
          }
        }
        return true
      })

      return { totalTimeTaken, totalAnswered, totalSaved }
    }

    function getActiveRawInput() {
      const rawInput = getUsersRawInput()
      const { activeTest } = getActiveTest()
      if (!rawInput) return {}
      const allRawInput = rawInput[activeTest.test_id]
      if (allRawInput === null) return {}
      const rawInputStats = getActiveRawInputStats(allRawInput, activeTest)
      return { allRawInput, ...rawInputStats }
    }

    function getActiveQuestionRawInput(qid) {
      const activeRawInput = getActiveRawInput()
      if (!Object.keys(activeRawInput).length) return {}
      const { allRawInput } = activeRawInput
      const questionRawInput = allRawInput[qid]
      return questionRawInput || {}
    }

    function getLatestRawInput() {
      const usersRawInput = getUsersRawInput()
      const { activeTest } = getActiveTest()
      if (!usersRawInput) {
        return {
          indexRawInput: 1,
          selectedCount: 0,
          latestRawInput: {}
        }
      }
      const activeRawInput = usersRawInput[activeTest.test_id]
      const indexRawInput = activeRawInput.length - 1
      const latestRawInput = activeRawInput[indexRawInput]
      const selectedCount = Object.keys(latestRawInput).length
      return { indexRawInput, selectedCount, latestRawInput }
    }

    function getFirebaseLoadingStatus() {
      const { session } = props
      return isLoaded(session)
    }

    function getFirebaseNode() {
      const { uuid } = getUsersAuth()
      const { activeTest } = getActiveTest()
      const { test_id: testId } = activeTest
      return {
        rawStatusNode: `raw_status/${uuid}/${testId}`,
        rawInputNode: `raw_input/${uuid}/${testId}`
      }
    }

    return (
      <WrappedComponent
        {...props}
        getUsersAuth={getUsersAuth}
        getUsersProject={getUsersProject}
        getUsersTest={getUsersTest}
        getUsersSession={getUsersSession}
        getUsersMapping={getUsersMapping}
        getUsersRawStatus={getUsersRawStatus}
        getUsersRawInput={getUsersRawInput}
        getAssessmentFinishedStatus={getAssessmentFinishedStatus}
        getFirstTest={getFirstTest}
        getNextTest={getNextTest}
        getLastTest={getLastTest}
        getActiveTestSlug={getActiveTestSlug}
        getActiveTest={getActiveTest}
        getActiveRawStatus={getActiveRawStatus}
        getActiveRawInput={getActiveRawInput}
        getActiveRawInputStats={getActiveRawInputStats}
        getLatestRawInput={getLatestRawInput}
        getActiveQuestionRawInput={getActiveQuestionRawInput}
        getFirebaseLoadingStatus={getFirebaseLoadingStatus}
        getFirebaseNode={getFirebaseNode}
      />
    )
  }

  Component.propTypes = {
    match: PropTypes.object,
    appAuth: PropTypes.object,
    firebaseAuth: PropTypes.object,
    dashboard: PropTypes.object,
    firebase: PropTypes.object,
    session: PropTypes.object,
    rawStatus: PropTypes.object,
    rawInput: PropTypes.object,
    soal: PropTypes.object
  }

  return Component
}

export default Subtest
