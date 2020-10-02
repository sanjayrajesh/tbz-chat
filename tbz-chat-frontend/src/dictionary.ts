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
    }
}

export default dictionary