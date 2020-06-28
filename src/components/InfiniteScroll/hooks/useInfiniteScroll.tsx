import { useState, useEffect } from 'react'

//@ts-ignore
const useInfiniteScroll = (callback) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
    setIsLoading(true)
  }

  useEffect(() => {
    // mounts once after component mounts, similar to componenDidMount
    callback()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoading) return
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return [isLoading, setIsLoading]
}

export default useInfiniteScroll