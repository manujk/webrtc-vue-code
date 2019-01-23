import Home from './components/Home'
import Customer from './components/signalling/Customer'
import Agent from './components/signalling/Agent'
import Chat from './components/rooms/ChatWebRtc'

export const routes = [
  {path: '', component: Home},
  {path: '/customer', component: Customer},
  {path: '/agent', component: Agent},
  {path: '/room', name:'room', component: Chat, props: true}
];
