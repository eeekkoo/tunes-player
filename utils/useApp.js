import { useEffect, useState, createContext, useContext, useRef } from 'react'

export const UserContext = createContext()

export const UserContextProvider = props => {
  const audioRef = useRef(null)
  const [songs, setSongs] = useState()
  const [loading, setLoading] = useState(true)
  const [currentSong, setCurrentSong] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(true)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const player = useRef()
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)

  useEffect(() => {
    const run = async () => {
      let songs = await fetch(
        'https://sounds-visualizer-api.sambarrowclough.repl.co/v2/songs'
      ).then(r => r.json())
      setSongs(songs)
      setCurrentSong(songs[0])
      setLoading(false)
    }
    run()
  }, [])

  const value = {
    audioRef,
    songs,
    setSongs,
    loading,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    libraryStatus,
    setLibraryStatus,
    songInfo,
    setSongInfo,

    // handleProgress,
    // handlePlayPause,
    // handleSeekChange,
    // handleSeekMouseUp,
    // handleSeekMouseDown,
    // handleDuration,
    played,
    setPlayed,
    duration,
    setDuration,
    player,
    playing,
    setPlaying,
    seeking,
    setSeeking
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useApp = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
