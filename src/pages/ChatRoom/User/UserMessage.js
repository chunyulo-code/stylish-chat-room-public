function UserMessage({ userChat }) {
  return (
    <div className="flex self-end">
      <div className="mr-[10px] self-end">
        <span className="text-xs">{userChat && userChat.time_stamp}</span>
      </div>
      <div className="mr-[17px] flex flex-col self-end pt-[10px] lg:mr-[15px] lg:pt-[12px]">
        <span className="self-end text-sm lg:text-[15px]">
          {userChat && userChat.name}
        </span>
        <p className="mt-[13px] flex justify-center rounded-bl-[15px] rounded-br-[15px] rounded-tl-[15px] bg-chatroom-light-gray px-3 py-2 text-sm">
          {userChat && userChat.message}
        </p>
      </div>
      <div className="self-start">
        <img
          src={userChat.picture}
          alt="fake profile"
          className="h-[40px] w-[40px] rounded-full"
        />
      </div>
    </div>
  );
}

export default UserMessage;
