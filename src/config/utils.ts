export const fingerPlacement = (c: string): string => {
  const input = c.charAt(0);
  switch(input) {
    case '§':
    case '°':
    case '1':
    case '!':
    case '©':
    case 'tab':
    case 'q':
    case 'capslock:':
    case  'a':
    case 'shift':
    case '<':
    case '>':
    case 'z':
    case 'ctrl':
    case 'left alt':
    //windows + cmd
      return 'Använd vänster lillfinger för att trycka på '+c;
    case '2':
    case '\"':
    case '@':
    case 'w':
    case 's':
    case 'x':
        return 'Använd vänster ringfinger för att trycka på '+c;
    case '3':
    case '#':
    case '£':
    case 'e':
    case 'd':
    case 'c':
      return 'Använd vänster långfinger för att trycka på '+c;
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
      return 'Använd väsnter pekfinger för att trycka på '+c;
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
      return 'Använd höger pekfinger för att trycka på '+c;
    case '8':
    case '(':
    case '[':
    case 'i':
    case 'k':
    case ',':
    case ';':
      return 'Använd höger långfinger för att trycka på '+c;
    case '9':
    case ')':
    case ']':
    case 'o':
    case 'l':
    case '.':
    case ':':
      return 'Använd höger ringfinger för att trycka på '+c;
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
      return 'Använd höger lillfinger för att trycka på '+c;
    default:
      return '';
  }
}
