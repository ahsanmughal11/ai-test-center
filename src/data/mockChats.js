export const currentUser = {
  id: 'me',
  name: 'You',
  email: 'you@instant.chat',
}

export const conversations = [
  {
    id: '1',
    name: 'Sarah Chen',
    online: true,
    unread: 2,
    lastMessage: 'Sounds good, see you at 3!',
    lastTime: '2m',
    messages: [
      { id: 'm1', senderId: '1', text: 'Hey! Are we still on for the design review?', time: '10:32 AM' },
      { id: 'm2', senderId: 'me', text: 'Yes, absolutely. I just finished the mockups.', time: '10:34 AM' },
      { id: 'm3', senderId: '1', text: 'Perfect timing. Can you share the link?', time: '10:35 AM' },
      { id: 'm4', senderId: 'me', text: 'Just sent it in the project channel.', time: '10:36 AM' },
      { id: 'm5', senderId: '1', text: 'Sounds good, see you at 3!', time: '10:38 AM' },
    ],
  },
  {
    id: '2',
    name: 'Dev Team',
    online: false,
    unread: 0,
    lastMessage: 'Alex: Deploy is live 🎉',
    lastTime: '1h',
    messages: [
      { id: 'm1', senderId: 'alex', senderName: 'Alex', text: 'Pushing to production now', time: '9:15 AM' },
      { id: 'm2', senderId: 'me', text: 'Standing by for smoke tests', time: '9:18 AM' },
      { id: 'm3', senderId: 'alex', senderName: 'Alex', text: 'Deploy is live 🎉', time: '9:22 AM' },
    ],
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    online: true,
    unread: 0,
    lastMessage: 'Thanks for the quick turnaround',
    lastTime: '3h',
    messages: [
      { id: 'm1', senderId: '3', text: 'Could you take a look at the API docs?', time: 'Yesterday' },
      { id: 'm2', senderId: 'me', text: 'Done — left a few comments on the auth section.', time: 'Yesterday' },
      { id: 'm3', senderId: '3', text: 'Thanks for the quick turnaround', time: 'Yesterday' },
    ],
  },
  {
    id: '4',
    name: 'Emma Wilson',
    online: false,
    unread: 0,
    lastMessage: 'Let me know when you are free',
    lastTime: 'Yesterday',
    messages: [
      { id: 'm1', senderId: '4', text: 'Got a minute to sync on the roadmap?', time: 'Yesterday' },
      { id: 'm2', senderId: 'me', text: 'Sure, how about tomorrow morning?', time: 'Yesterday' },
      { id: 'm3', senderId: '4', text: 'Let me know when you are free', time: 'Yesterday' },
    ],
  },
  {
    id: '5',
    name: 'Product Updates',
    online: false,
    unread: 5,
    lastMessage: 'New feature: dark mode is here',
    lastTime: 'Mon',
    messages: [
      { id: 'm1', senderId: 'bot', senderName: 'Instant Chat', text: 'New feature: dark mode is here', time: 'Mon 9:00 AM' },
    ],
  },
]
