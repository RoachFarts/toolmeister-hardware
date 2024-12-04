import Loader from '../../components/Loader'

const LoadingPage = () => {
  return (
  <div className="flex justify-center items-center min-h-screen" role="status" aria-live="polite">
      <Loader size="large" />
      <span className="sr-only">Loading page content...</span>
    </div>
  )
}

export default LoadingPage