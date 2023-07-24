import {
  FC,
  useEffect,
  useRef
} from "react";
import { User } from "../types/user";
import './UserItem.scss';
import UserAvatar from "./UserAvatar";
import { getFormattedRaceTime } from "../utils/common";

export interface UserItemProps {
  user: User;
  isActive: boolean;
  index: number;
  onClick: () => void;
  maxIndexWidth?: number | undefined;
  setMaxIndexWidth?: (val: number | undefined) => void;
}

const UserItem: FC<UserItemProps> = ({
  isActive,
  onClick,
  index,
  maxIndexWidth,
  setMaxIndexWidth,
  user
}) => {
  const indexElement = useRef<HTMLDivElement>(null);
  const raceTime = getFormattedRaceTime(user.time);

  useEffect(() => {
    if (indexElement.current) {
      const width = indexElement.current.clientWidth;
      if (setMaxIndexWidth) {
        //@ts-ignore
        setMaxIndexWidth(prevMaxWidth => {
            if (!prevMaxWidth || width > prevMaxWidth) {
            return width;
          }
          return prevMaxWidth;
        });
      }
    }
  }, [index, maxIndexWidth, setMaxIndexWidth]);
  
  return (
  <div
    className="user-item"
    onClick={ onClick }
  >
    <div
      ref={indexElement}
      className="user-index"
      style={{ minWidth: maxIndexWidth ? maxIndexWidth + 'px' : undefined }}
    >
      { index }
    </div>
    <div
      className="user-avatar-wrap"
      style={{ border: isActive ? '2px solid purple' : '2px solid transparent' }}
    >
      <UserAvatar userColor={ user.color } />
    </div>
    <div className="user-content-wrap">
      <p className="user-name">{ user.name }</p>
      <div className="race-params">
        <span className="race-time">{raceTime}</span>
        <span className="divider">|</span>
        <span className="speed">{user.speed.toFixed(2)}km/h</span>
      </div>
    </div>
  </div>
)};

export default UserItem;