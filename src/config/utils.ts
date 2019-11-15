
//EZ: Can't use i18n-next from here since this is not a React component. 
//EZ: Haven't figured out how to solve it so I made an ugly fix and put fingerl placement ocalization in here for now.

export const fingerPlacement = (input: string, lang: string): string => {
  const character = input.charAt(0);
  if (lang === 'sv-SE') {  
    switch (character) {
      case '§':
      case '°':
      case '1':
      case '!':
      case '©':
      case 'tab':
      case 'q':
      case 'capslock:':
      case 'a':
      case 'shift':
      case '<':
      case '>':
      case 'z':
      case 'ctrl':
      case 'left alt':
      // Windows + cmd
        return 'Använd vänster lillfinger för att trycka på ' + character; 
      case '2':
      case '@':
      case 'w':
      case 's':
      case 'x':
        return 'Använd vänster ringfinger för att trycka på ' + character;
      case '3':
      case '#':
      case '£':
      case 'e':
      case 'd':
      case 'c':
        return 'Använd vänster långfinger för att trycka på ' + character; 
      case '4':
      case '€':
      case '$':
      case 'r':
      case 'f':
      case 'v':
      case '5':
      case '%':
      case '∞':
      case 't':
      case 'g':
      case 'b':
        return 'Använd vänster pekfinger för att trycka på ' + character;
      case '6':
      case '&':
      case 'y':
      case 'h':
      case 'n':
      case '7':
      case '/':
      case '|':
      case 'u':
      case 'j':
      case 'm':
        return 'Använd höger pekfinger för att trycka på ' + character;  
      case '8':
      case '(':
      case '[':
      case 'i':
      case 'k':
      case ',':
      case ';':
        return 'Använd höger långfinger för att trycka på ' + character;
      case '9':
      case ')':
      case ']':
      case 'o':
      case 'l':
      case '.':
      case ':':
        return 'Använd höger ringfinger för att trycka på ' + character; 
      case '0':
      case '=':
      case 'p':
      case 'ö':
      case '-':
      case '_':
      case '+':
      case '?':
      case 'å':
      case 'ä':
      case '´':
      case '`':
      case '¨':
      case '^':
      case '\'':
      case '*':
          return 'Använd höger lillfinger för att trycka på ' + character;
      default:
        return '';
    }
  }
  if (lang === 'en-US') {
    switch (character) {
      case '1':
      case '!':
      case 'tab':
      case 'q':
      case 'capslock:':
      case 'a':
      case 'shift':
      case 'z':
      case 'ctrl':
      case 'left alt':
        return 'Use your left little finger to press ' + character; 
      case '2':
      case '@':
      case 'w':
      case 's':
      case 'x':
        return 'Use your left ring finger to press ' + character; 
      case '3':
      case '#':
      case 'e':
      case 'd':
      case 'c':
        return 'Use your left index finger to press ' + character;
      case '4':
      case '$':
      case 'r':
      case 'f':
      case 'v':
      case '5':
      case '%':
      case '∞':
      case 't':
      case 'g':
      case 'b':
        return 'Use your left fore finger to press ' + character;         
      case '6':
      case '^':
      case 'y':
      case 'h':
      case 'n':
      case '7':
      case '&':
      case 'u':
      case 'j':
      case 'm':
        return 'Use your right fore finger to press ' + character;
      case '8':
      case '*':
      case 'i':
      case 'k':
      case ',':
      case '<':
        return 'Use your right index finger to press ' + character;
      case '9':
      case '(':
      case ']':
      case 'o':
      case 'l':
      case '>':
      case '.':
        return 'Use your right ring finger to press ' + character;            
      case '0':
      case ')':
      case 'p':
      case ':':
      case ';':
      case '?':
      case '_':
      case '-':
      case '{':
      case '[':
      case '"':
      case '\'':
      case '+':
      case '=':
      case '}':
      case ']':
      case '|':
        return 'Use your right little finger to press ' + character;  
      default:
         return '';
    }
  }
  return '';
};
