import morse from "../data/morse";

export const convertToMorse = function (
  text: string,
  dot: string,
  dash: string,
  lang = "tr" as "tr" | "en"
) {
  let lowerCaseText = "";
  if (lang === "tr") lowerCaseText = text.toLocaleLowerCase("tr-TR");
  else lowerCaseText = text.toLowerCase();

  const lowerCaseChars = lowerCaseText.split("");
  const morseChars = lowerCaseChars.map((lowerCaseChar) =>
    lowerCaseChar.replace(/(.)/g, (m) =>
      m in morse ? morse[m as keyof typeof morse] : m == " " ? "/" : m
    )
  );
  const customMorseChars = morseChars.map((customMorseChar) =>
    customMorseChar.replace(/(.)/g, (m) =>
      m == "." ? dot : m == "-" ? dash : m
    )
  );

  return customMorseChars.join(" ");
};

export const convertFromMorse = function (
  text: string,
  dot: string,
  dash: string
) {
  const customMorseWords = text.split("/");
  const words = customMorseWords.map((customMorseWord) => {
    const customMorseChars = customMorseWord.split(" ");
    const chars = customMorseChars.map((customMorseChar) => {
      const morseChar = customMorseChar.replace(
        new RegExp(`${dot}|${dash}`, "g"),
        (m) => {
          if (m == dash) return "-";
          else if (m == dot) return ".";
          else if (m == "/") return " ";
          else return m;
        }
      );
      console.log(morseChar);
      const char = morseChar.replace(morseChar.trim(), (m) => {
        const i = Object.values(morse).indexOf(m);
        if (i != -1) return Object.keys(morse)[i];
        else return "";
      });
      return char;
    });
    const word = chars.join("");
    return word;
  });
  return words.join(" ");
};
