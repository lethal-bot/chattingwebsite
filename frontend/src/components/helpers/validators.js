export function userNameValidation(name) {
    if (name.length < 6) return "username length must be greater than 6";
    for (let i = 0; i < name.length; i++) {
        if (!((name[i] >= 'a' && name.at(i) <= 'z') || (name[i] >= 'a' && name.at(i) <= 'z') || (name[i] >= '0' && name.at(i) <= '9') || name[i] == '_')) return "only alphabets, numbers and _ allowed";

    }
}

export function nameValidation(name) {
    let count = 0;
    for (let i = 0; i < name.length; i++) {
        if (!((name[i] >= 'a' && name.at(i) <= 'z') || (name[i] >= 'a' && name.at(i) <= 'z') || name[i] == ' ')) return "only alphabets and space allowed";
        if (name[i] === ' ') count++;
    }
    if (count > 1) return "format must be FIRSTNAME LASTNAME"
}

export function emailValidation(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return "invalid email";
}

export function passwordValidation(password) {
    if (password.length < 6) return "length must be greater than 5";
}

// module.exports = { userNameValidation, nameValidation, emailValidation, passwordValidation }