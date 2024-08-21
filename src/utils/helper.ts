import CryptoJS from 'crypto-js';
export const encryptData = (data: string | undefined) => {
    if (data && data !== '') {
        const encryptedData = CryptoJS.AES.encrypt(data, import.meta.env.secretKey || '').toString()
        return encryptedData
    }
}

export const decryptData = (data: string | undefined) => {
    if (data && data !== '') {
        const bytes = CryptoJS.AES.decrypt(data, import.meta.env.secretKey || '');
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedString;
    }
}

