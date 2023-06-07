function UserMessage({ userChat, userImage }) {
  return (
    <div className="flex self-end last:mb-[80px]">
      <div className="self-end mr-[10px]">
        <span className="text-[14px] lg:text-[12px]">
          {userChat && userChat.time_stamp}
        </span>
      </div>
      <div className="self-end mr-[17px] flex flex-col pt-[19px] lg:mr-[15px] lg:pt-[12px]">
        <span className="self-end text-[20px] lg:text-[15px]">
          {userChat && userChat.name}
        </span>
        <p className="flex items-center mt-[13px] text-[20px] h-[40px] px-[20px] bg-[#d9d9d9] rounded-tl-[15px] rounded-br-[15px] rounded-bl-[15px] lg:text-[15px] lg:px-[28px]">
          {userChat && userChat.message}
        </p>
      </div>
      <div className="self-start">
        <img
          src={userImage}
          alt="fake profile"
          className="w-[60px] h-[60px] rounded-full"
        />
      </div>
    </div>
  );
}

export default UserMessage;
