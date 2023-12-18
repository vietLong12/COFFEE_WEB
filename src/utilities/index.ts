// Thay thế - thành " "
export function convertSpaceToHyphen(inputString: string) {
  const resultString = inputString.replace(/\s+/g, "-");
  return resultString;
}

export function capitalizedString(inputString: string) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function getRandomNumber(num: number) {
  return Math.floor(Math.random() * num) + 1;
}

export function formatPrice(price: string | number | undefined) {
  if (price) {
    return `$${price}.00`;
  } else return null;
}

export function randomString(length : number) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  if (! length) {
      length = Math.floor(Math.random() * chars.length);
  }

  var str = '';
  for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
