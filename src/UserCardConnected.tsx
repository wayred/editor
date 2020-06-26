import React from "react";
import UserCard, {UserCardProps} from "./UserCard";

const Translation: any = {
  en: {
    michael: "michael",
    peter: "peter"
  },
  es: {
    michael: "miguel",
    peter: "pedro"
  }
};

const t = (lang: string, key: string) => {
  return Translation[lang][key];
}

const userCardHOC = (lang: string) => {
  return (Comp: any) =>
  {
    return (props : UserCardProps) => <Comp userName={t(lang, props.userName)}/>
  }
}

export default userCardHOC('es')(UserCard);