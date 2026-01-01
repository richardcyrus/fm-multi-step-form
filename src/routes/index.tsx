import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <footer className="attribution">
      Challenge by{' '}
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
        Frontend Mentor
      </a>
      . Coded by{' '}
      <a href="https://www.richardcyrus.com" target="_blank">
        Richard Cyrus
      </a>
      .
    </footer>
  )
}
