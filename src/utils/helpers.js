export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

// ["8xf0y6ziyjabvozdd253nd": {
//   id: '8xf0y6ziyjabvozdd253nd',
//   author: 'sarahedo',
//   timestamp: 1467166872634,
//   optionOne: {
//     votes: ['sarahedo'],
//       text: 'have horrible short term memory',
//   },

//   optionTwo: {
//     votes: [],
//       text: 'have horrible long term memory'
//   }
// },]

export function formatPoll(poll, author, authedUser, parentPoll) {
  const { id, timestamp, optionOne, optionTwo } = poll
  const { name, avatarURL } = author 

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
  }
}
