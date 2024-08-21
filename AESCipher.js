import CryptoJS from 'crypto-js';

const encryptData = (text, keyBase64, ivBase64) => {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return encrypted.toString(); // Devuelve el texto cifrado en formato base64
};

const decryptData = (cipherText, keyBase64, ivBase64) => {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8); // Devuelve el texto plano
};

export { encryptData, decryptData };