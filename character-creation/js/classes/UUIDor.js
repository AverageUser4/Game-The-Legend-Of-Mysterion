'use strict';

class UUIDor {

  static getUUID(binary = false) {
    let uuid = '';

    for(let i = 1; i <= 32; i++) {
      uuid += Math.floor(Math.random() * 16).toString(16);

      switch(i) {
        case 8:
        case 12:
        case 16:
        case 20:
          uuid += '-';
      }
    }

    return binary ? UUIDor.hexToBin(uuid) : uuid;
  }

  static hexToBin(uuid) {
    uuid = uuid.replace(/-/g, '');
    let transformed = '';

    for(let i = 0; i < 32; i++)
      transformed += parseInt(uuid.charAt(i), 16).toString(2).padStart(4, '0');

    return transformed;
  }

  static binToHex(uuid) {
    let transformed = '';

    for(let i = 0; i < 128; i += 4) {
      transformed += parseInt(uuid.charAt(i) + uuid.charAt(i + 1) + uuid.charAt(i + 2) + uuid.charAt(i + 3), 2).toString(16);
      switch(i) {
        case 12:
        case 28:
        case 44:
        case 60:
          transformed += '-';
      }
    }

    return transformed;
  }

}