import React, { useState, useEffect } from "react";
import ChatLoading from "../Templates/chatLoading";
import ChatUsers from "../Templates/chatUsers";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";
import MainChat from "../Templates/mainChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kakaoProfile } from "../../apis/auth";

const ChatContainer = () => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem(
      "accessToken",
      async (err, res: any) => {
        await kakaoProfile().then((res) => {
          setUserAvatar(res.data.profileImageUrl);
          setUserId(res.data.seq);
        });
      }
    );
  };

  const [userId, setUserId] = useState<any>(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [currentPage, setCurrentPage] = useState("loading");
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState<any>(null);

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    // console.log(userId);
    if (userId) {
      onLogin();
    }
  }, [userId]);
  const onLogin = async () => {
    try {
      const database = getDatabase();
      const user = await findUser();
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          userId: userId,
          avatar: userAvatar,
        };
        set(ref(database, `users/${userId}`), newUserObj);
        setMyData(newUserObj);
      }

      // set friends list change listener
      const myUserRef = ref(database, `users/${userId}`);
      onValue(myUserRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        setUsers(data?.friends);
        setMyData((prevData) => ({
          ...prevData,
          friends: data?.friends,
        }));
      });
      setCurrentPage("users");
    } catch (error) {
      console.error(error);
    }
  };

  const findUser = async () => {
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${userId}`));
    return mySnapshot.val();
  };

  const onClickUser = (user) => {
    setCurrentPage("chat");
    setSelectedUser(user);
  };

  const onAddFriend = async (name) => {
    try {
      //find user and add it to my friends and also add me to his friends
      const database = getDatabase();

      const user = await findUser();

      if (user) {
        if (user.userId === myData.userId) {
          // don't let user add himself
          return;
        }

        if (
          myData.friends &&
          myData.friends.findIndex((f) => f.userId === user.userId) > 0
        ) {
          // don't let user add a user twice
          return;
        }

        // create a chatroom and store the chatroom id

        const newChatroomRef = push(ref(database, "chatrooms"), {
          firstUser: myData.userId,
          secondUser: user.userId,
          messages: [],
        });

        const newChatroomId = newChatroomRef.key;

        const userFriends = user.friends || [];
        //join myself to this user friend list
        update(ref(database, `users/${user.userId}`), {
          friends: [
            ...userFriends,
            {
              userId: myData.userId,
              avatar: myData.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });

        const myFriends = myData.friends || [];
        //add this user to my friend list
        update(ref(database, `users/${myData.userId}`), {
          friends: [
            ...myFriends,
            {
              userId: user.userId,
              avatar: user.avatar,
              chatroomId: newChatroomId,
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onBack = () => {
    setCurrentPage("users");
  };

  switch (currentPage) {
    case "loading":
      return <ChatLoading />;
    case "users":
      return (
        <ChatUsers
          users={users}
          onClickUser={onClickUser}
          userToAdd={userToAdd}
          setUserToAdd={setUserToAdd}
          onAddFriend={onAddFriend}
        />
      );
    case "chat":
      return (
        <MainChat
          myData={myData}
          selectedUser={selectedUser}
          onBack={onBack}
          userId={userId}
        />
      );
    default:
      return null;
  }
};

export default ChatContainer;
