export interface Event {
  id: number
  userId: number
  name: string
  type: string
  date: string
  description: string
  dateCreation: string
  week: number
  month: number
  year: number
}

export interface BaseEvent {
  id: number
  userId: number
  name: string
  type: string
  date: string
  description: string
  dateCreation: string
}

export interface NewEvent {
  userId: number
  name: string
  type: string
  date: string
  description: string
  week: number
  month: number
  year: number
}

export interface User {
  id: number
  email: string
  username: string
}

export interface NewUser {
  email: string
  username: string
  password: string
}

export interface UserAuthentication {
  username: string
  password: string
}
