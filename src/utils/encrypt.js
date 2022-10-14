import CryptoJS from "crypto-js";

export const aesEncryption = (data) => {

  const iv = process.env.REACT_APP_ENCRYPTION_IV
  const key = process.env.REACT_APP_ENCRYPTION_KEY
  
  const fkey = CryptoJS.enc.Utf8.parse(key);
  const fiv = CryptoJS.enc.Utf8.parse(iv);


  const enc = CryptoJS.AES.encrypt(data, fkey, {
    iv: fiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const final = enc.ciphertext.toString(CryptoJS.enc.Base64);
  return final

};

