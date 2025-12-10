export interface Contact {
  title: string
  contacts: ContactItem[]
}

export interface ContactItem {
  type: string
  linkText: string
  urlLink: string
}
