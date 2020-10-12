type Dictionary = {
    [key: string]: {
        [language: string]: string
    }
}

const dictionary: Dictionary = {
    email: {
        en: "Email",
        de: "E-Mail"
    },
    password: {
        en: "Password",
        de: "Passwort"
    },
    login: {
        en: "Login",
        de: "Anmelden"
    },
    "login.failure": {
        en: "Incorrect email or password",
        de: "Ungültige E-Mail oder Password"
    },
    "show.password": {
        en: "Show password",
        de: "Passwort einblenden"
    },
    "hide.password": {
        en: "Hide password",
        de: "Passwort ausblenden"
    },
    chats: {
        en: "Chats",
        de: "Chats"
    },
    register: {
        en: "Register",
        de: "Registrieren"
    },
    "register.with.email": {
        en: "Register with your email address",
        de: "Registrieren Sie sich mit Ihrer E-Mail Adresse"
    },
    "sign.out": {
        en: "Sign out",
        de: "Abmelden"
    },
    profile: {
        en: "Profile",
        de: "Profil"
    },
    "search.chats": {
        en: "Search chats",
        de: "Chats suchen"
    },
    "no.messages": {
        en: "No messages",
        de: "Keine Nachrichten"
    },
    "select.a.chat": {
        en: "Select a chat to view it's messages",
        de: "Wählen sie einen Chat aus, um dessen Nachrichten zu sehen"
    },
    members: {
        en: "Members",
        de: "Mitglieder"
    },
    administrator: {
        en: "Administrator",
        de: "Administrator"
    },
    "make.administrator": {
        en: "Make administrator",
        de: "Zum Administrator machen"
    },
    "remove.from.chat": {
        en: "Remove from chat",
        de: "Aus Chat entfernen"
    },
    "type.a.message": {
        en: "Type a message",
        de: "Schreiben Sie eine Nachricht"
    },
    details: {
        en: "Details",
        de: "Details"
    },
    "leave.chat": {
        en: "Leave chat",
        de: "Chat verlassen"
    },
    "confirm.leave.chat": {
        en: "Leave chat \"{}\"?",
        de: "Chat \"{}\" verlassen?"
    },
    cancel: {
        en: "Cancel",
        de: "Abbrechen"
    },
    confirm: {
        en: "Confirm",
        de: "Bestätigen"
    }
}

export default dictionary