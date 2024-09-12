type LangType = "zh" | "en";
//zh-CN | en-US 为门户统一语言字段   zh | en 为管理端语言字段
const localLang = localStorage.getItem("JH_SYSTEM_LANGUAGE") as LangType;
let languageType: LangType = "zh";
if (localLang) {
  languageType = localLang.indexOf("en") === 0 ? "en" : "zh";
} else {
  const navLang = navigator.language || (navigator as any).browserLanguage;
  languageType = navLang.indexOf("en") === 0 ? "en" : "zh";
}

export { languageType };
