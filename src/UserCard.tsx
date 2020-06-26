import React from "react";

export type UserCardProps = {
  userName: string;
}

const UserCard = (props : UserCardProps) => {
  return <div> {props.userName}</div>
}

export default UserCard;
