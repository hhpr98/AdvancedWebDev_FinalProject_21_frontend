import format from 'date-fns/format';


// Add padding from the start of the current string/number
export const myPadStart = (el, targetLength, padString) => {
   return el?.toString().padStart(targetLength, padString);
};

// Insert something after every n characters in the string
export const chunker = (el, step, string) => {
   const regExp = new RegExp(`.{${step}}`, 'g');
   return el
      .toString()
      .match(regExp)
      .join(string);
};

// Format date
export const formatDate = (date, dateFormat) => format(new Date(date), dateFormat);

