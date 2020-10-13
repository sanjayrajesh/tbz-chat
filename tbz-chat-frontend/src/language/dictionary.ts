import { Language } from "./language";

const dictionary = {
    email: {
        en: "Email",
        de: "E-Mail"
    },
    username: {
        en: "Username",
        de: "Benutzername"
    },
    password: {
        en: "Password",
        de: "Passwort"
    },
    "confirm.password": {
        en: "Confirm password",
        de: "Passwort wiederholen"
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
    "sign.in": {
        en: "Sign in",
        de: "Anmelden"
    },
    "sign.in.link": {
        en: "Already have an account? Sign in instead",
        de: "Sie haben bereits einen Account? Melden Sie sich an"
    },
    "sign.out": {
        en: "Sign out",
        de: "Abmelden"
    },
    "sign.up": {
        en: "Sign up",
        de: "Account erstellen"
    },
    "sign.up.link": {
        en: "Don't have an account yet? Sign up instead",
        de: "Sie haben noch keinen Account? Erstellen Sie einen neuen"
    },
    "sign.up.with.email": {
        en: "Sign up with your email address",
        de: "Registrieren Sie sich mit Ihrer E-Mail Adresse"
    },
    "sign.up.success": {
        en: "Sign up successful",
        de: "Account erfolgreich erstellt"
    },
    "invitation.sent.1": {
        en: "An invitation was sent to ",
        de: "Es wurde eine Einladung an "
    },
    "invitation.sent.2": {
        en: "",
        de: " verschickt"
    },
    profile: {
        en: "Profile",
        de: "Profil"
    },
    "my.profile": {
        en: "My profile",
        de: "Mein Profil"
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
    },
    back: {
        en: "Back",
        de: "Zurück"
    },
    "activate.account": {
        en: "Activate account",
        de: "Account aktivieren"
    },
    "activate.your.account": {
        en: "Activate your account",
        de: "Aktivieren Sie ihren Account"
    }
}

export type Dictionary = {
    [K in keyof typeof dictionary]: {
        [L in Language]: string
    }
}

export default dictionary as Dictionary