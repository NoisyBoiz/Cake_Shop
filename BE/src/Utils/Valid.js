const Valid = {
    isEmpty: (value) => {
        return value == null || value == "";
    },

    isName: (name) => {
        const namePattern = /[a-zA-Z]/i;
        return namePattern.test(name);
    },

    isEmail: (email) => {
        const emailPattern = /[a-zA-Z0-9]/i;
        return emailPattern.test(email);
    },

    isPhoneNumber: (phoneNumber) => {  
        const phoneNumberPattern = /[0-9]{10,11}/i;
        return phoneNumberPattern.test(phoneNumber);
    },

    isAddress: (address) => {
        const addressPattern = /[a-zA-Z0-9]/i;
        return addressPattern.test(address);
    },

    isPassword: (password) => {
        const passwordPattern = /[a-zA-Z0-9]/i;
        return passwordPattern.test(password);
    },

    isNumber: (number) => {
        const numberPattern = /[0-9]/i;
        return numberPattern.test(number);
    },

    isNotice: (notice) => {
        const noticePattern = /[a-zA-Z0-9]/i;
        return noticePattern.test(notice);
    },
    isString: (string) => {
        const stringPattern = /[a-zA-Z]/i;
        return stringPattern.test(string);
    }

}

export default Valid;