export const validatePhoneNumber = (phoneNumber) => {
    // const phoneNumberRegex = /[\d]{11}/;
    // return phoneNumberRegex.test(phoneNumber)
    if(phoneNumber?.length === 11) {
        return true
    }

    return false
}

export const validateBVN = (bvnNumber) => {
    if(bvnNumber?.length === 11) {
        return true
    }

    return false
}