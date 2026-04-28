import axios from 'axios'

const groupApi = axios.create({
  withCredentials: true,
})

export const fetchGroups = async () => {
  const response = await groupApi.get('/api/groups')
  return response.data
}

export const createGroup = async ({ groupName, currentChallenge }) => {
  const response = await groupApi.post('/api/groups', {
    groupName,
    currentChallenge,
  })

  return response.data
}

export const joinGroup = async (groupId) => {
  const response = await groupApi.post(`/api/groups/${groupId}/join`)
  return response.data
}

export const fetchGroupMessages = async (groupId) => {
  const response = await groupApi.get(`/api/groups/${groupId}/messages`)
  return response.data
}

export const sendGroupMessage = async (groupId, message) => {
  const response = await groupApi.post(`/api/groups/${groupId}/messages`, {
    message,
  })

  return response.data
}
