import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createGroup,
  fetchGroupMessages,
  fetchGroups,
  joinGroup,
  sendGroupMessage,
} from '../services/groupService'

const formatTime = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))

const wsBase =
  import.meta.env.VITE_WS_URL ||
  `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8000`

function Group() {
  const navigate = useNavigate()
  const username = sessionStorage.getItem('feed_username') || 'Explorer'
  const wsRef = useRef(null)

  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState('')
  const [messages, setMessages] = useState([])
  const [groupName, setGroupName] = useState('')
  const [challenge, setChallenge] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const activeGroup = useMemo(
    () => groups.find((group) => String(group._id) === String(groupId)),
    [groups, groupId],
  )

  const canChat = Boolean(activeGroup?.isMember)

  const appendMessage = (message) => {
    if (!message?._id) {
      return
    }

    setMessages((current) => {
      if (current.some((item) => String(item._id) === String(message._id))) {
        return current
      }

      return [...current, message]
    })
  }

  const loadGroups = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetchGroups()
      const list = response?.data?.groups || []

      setGroups(list)
      setGroupId((oldGroupId) => {
        if (list.some((group) => String(group._id) === String(oldGroupId))) {
          return oldGroupId
        }

        return list.find((group) => group.isMember)?._id || list[0]?._id || ''
      })
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Unable to load groups')
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (id) => {
    if (!id) {
      setMessages([])
      return
    }

    setError('')

    try {
      const response = await fetchGroupMessages(id)
      setMessages(response?.data?.messages || [])
    } catch (apiError) {
      setMessages([])
      setError(apiError?.response?.data?.message || 'Unable to load messages')
    }
  }

  useEffect(() => {
    void loadGroups()
  }, [])

  useEffect(() => {
    if (!groupId || !canChat) {
      setMessages([])
      return
    }

    void loadMessages(groupId)
  }, [groupId, canChat])

  useEffect(() => {
    if (!groupId || !canChat) {
      wsRef.current?.close()
      wsRef.current = null
      return
    }

    wsRef.current?.close()
    const socket = new WebSocket(`${wsBase}/ws/groups?groupId=${groupId}`)
    wsRef.current = socket

    socket.onmessage = (event) => {
      try {
        const packet = JSON.parse(event.data)

        if (packet?.type === 'group_message' && packet?.payload) {
          appendMessage(packet.payload)
        }
      } catch {
        // Ignore malformed packets.
      }
    }

    return () => socket.close()
  }, [groupId, canChat])

  const handleCreate = async (event) => {
    event.preventDefault()

    if (!groupName.trim()) {
      setError('Group name is required')
      return
    }

    setError('')

    try {
      const response = await createGroup({ groupName, currentChallenge: challenge })
      const createdId = response?.data?.group?._id || ''

      setGroupName('')
      setChallenge('')
      await loadGroups()

      if (createdId) {
        setGroupId(createdId)
      }
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Unable to create group')
    }
  }

  const handleJoin = async (id) => {
    setError('')

    try {
      await joinGroup(id)
      await loadGroups()
      setGroupId(id)
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Unable to join group')
    }
  }

  const handleSend = async (event) => {
    event.preventDefault()

    if (!groupId || !text.trim()) {
      return
    }

    setError('')

    try {
      const response = await sendGroupMessage(groupId, text)
      appendMessage(response?.data?.message)
      setText('')
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Unable to send message')
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col gap-4 p-4 lg:flex-row'>
        <aside className='w-full rounded-xl border border-gray-700 bg-black p-4 lg:w-80'>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-extrabold tracking-wider'>GROUP CHAT</h1>
            <button
              className='border border-red-500 px-3 py-1 text-red-400 hover:bg-red-600 hover:text-black'
              onClick={() => navigate('/feed')}
            >
              BACK
            </button>
          </div>

          <p className='mb-3 text-sm text-gray-300'>
            Logged in as <span className='text-red-400'>{username}</span>
          </p>

          <form className='space-y-2 border border-gray-700 p-3' onSubmit={handleCreate}>
            <input
              className='w-full bg-gray-800 px-3 py-2 outline-none focus:ring-1 focus:ring-red-500'
              placeholder='Group name'
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
            />
            <input
              className='w-full bg-gray-800 px-3 py-2 outline-none focus:ring-1 focus:ring-red-500'
              placeholder='Challenge/topic'
              value={challenge}
              onChange={(event) => setChallenge(event.target.value)}
            />
            <button className='w-full bg-red-500 py-2 font-bold text-black hover:bg-red-600 hover:text-white' type='submit'>
              CREATE GROUP
            </button>
          </form>

          <div className='mt-4 flex items-center justify-between'>
            <h2 className='font-semibold text-red-400'>GROUPS</h2>
            <button className='text-sm text-gray-300 hover:text-white' onClick={() => loadGroups()}>
              Refresh
            </button>
          </div>

          <div className='mt-2 max-h-[50vh] space-y-2 overflow-auto'>
            {loading ? <div className='text-sm text-gray-400'>Loading...</div> : null}
            {!loading
              ? groups.map((group) => {
                  const selected = String(groupId) === String(group._id)

                  return (
                    <div
                      key={group._id}
                      className={`border p-3 ${selected ? 'border-red-500 bg-gray-900' : 'border-gray-700 bg-gray-950'}`}
                    >
                      <button className='w-full text-left' onClick={() => setGroupId(group._id)}>
                        <div className='font-semibold'>{group.group_name}</div>
                        <div className='text-xs text-gray-400'>{group.current_challenge || 'No challenge'}</div>
                      </button>

                      {!group.isMember ? (
                        <button
                          className='mt-2 border border-red-500 px-2 py-1 text-xs text-red-400 hover:bg-red-600 hover:text-black'
                          onClick={() => handleJoin(group._id)}
                        >
                          JOIN
                        </button>
                      ) : null}
                    </div>
                  )
                })
              : null}
          </div>

          {error ? <p className='mt-3 text-sm text-rose-400'>{error}</p> : null}
        </aside>

        <main className='flex min-h-[75vh] flex-1 flex-col rounded-xl border border-gray-700 bg-black'>
          <header className='border-b border-gray-700 p-4'>
            <h2 className='text-xl font-bold text-red-400'>{activeGroup?.group_name || 'Select a group'}</h2>
            <p className='text-sm text-gray-400'>{activeGroup?.current_challenge || 'Join a room to start live chat'}</p>
          </header>

          <div className='flex-1 space-y-3 overflow-auto p-4'>
            {!canChat ? <p className='text-gray-400'>Join this group to view and send messages.</p> : null}

            {canChat && !messages.length ? <p className='text-gray-400'>No messages yet.</p> : null}

            {canChat
              ? messages.map((message) => {
                  const mine = message?.sender?.username === username

                  return (
                    <div key={message._id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] border px-3 py-2 ${mine ? 'border-red-500 bg-red-500/15' : 'border-gray-700 bg-gray-900'}`}>
                        <div className='mb-1 flex gap-3 text-xs text-gray-400'>
                          <span>{message?.sender?.username || 'Unknown'}</span>
                          <span>{formatTime(message.createdAt)}</span>
                        </div>
                        <p className='text-sm'>{message.message}</p>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>

          <form className='border-t border-gray-700 p-4' onSubmit={handleSend}>
            <div className='flex gap-2'>
              <input
                className='flex-1 bg-gray-800 px-3 py-2 outline-none focus:ring-1 focus:ring-red-500'
                placeholder='Type your message...'
                value={text}
                onChange={(event) => setText(event.target.value)}
                disabled={!canChat}
              />
              <button
                className='bg-red-500 px-4 py-2 font-bold text-black hover:bg-red-600 hover:text-white disabled:opacity-50'
                type='submit'
                disabled={!canChat}
              >
                SEND
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Group
