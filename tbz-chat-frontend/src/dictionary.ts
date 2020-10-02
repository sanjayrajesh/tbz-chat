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
    }
}

export default dictionary