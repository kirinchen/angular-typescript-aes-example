import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EncryptionDecryptionSample';

  plainText: string;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;

  constructor() {
  }
  // method is used to encrypt and decrypt the text
  convertText(conversion: string) {
    if (conversion === 'encrypt') {
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
    }
    else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

    }
  }

  public decryptByCustom(): void {
    const key = CryptoJS.enc.Utf8.parse(this.decPassword.trim()); // 秘钥

    // const wsk = this.encryptText.trim(); // 后台返回的加密字符串
    // const encryptedHexStr = CryptoJS.enc.Hex.parse(wsk); // a551e4d54cfc396cc93c89dd55f6587c
    // const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const encryptedBase64Str = this.encryptText.trim();
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);

    console.log('解密后:' + decryptedStr);
  }
}
