import { Language } from "./language";

type Dictionary = {
    [key: string]: {
        [Lang in Language]: string;
    } | string;
}

const dictionary: Dictionary = {
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
    "add.members": {
        en: "Add members",
        de: "Mitglieder hinzufügen"
    },
    add: {
        en: "Add",
        de: "Hinzufügen"
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
    },
    "create.chat": {
        en: "Create chat",
        de: "Neuen Chat erstellen"
    },
    "name": {
        en: "Name",
        de: "Name"
    },
    "create": {
        en: "Create",
        de: "Erstellen"
    },
    "validation.required": {
        en: "This field is required",
        de: "Bitte füllen Sie dieses Feld aus"
    },
    "validation.email": {
        en: "Please provide a valid email",
        de: "Bitte geben Sie eine gültige E-Mail Adresse ein"
    },
    "validation.email.not.available": {
        en: "Email is already in use",
        de: "E-Mail Adresse wird bereits verwendet"
    },
    "validation.password.match": {
        en: "Password and confirmation must match",
        de: "Passwort und Bestätigung müssen übereinstimmen"
    },
    "validation.users.required": {
        en: "Please select at least one user",
        de: "Bitte wählen Sie mindestens einen Benutzer"
    },
    german: "Deutsch",
    english: "English",
    language: {
        en: "Language",
        de: "Sprache"
    }
}

export default dictionary