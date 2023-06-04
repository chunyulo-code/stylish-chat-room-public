import FakeProfile from "./fake-profile.png";

function UserMessage({ userChat }) {
  return (
    <div className="flex self-end ">
      <div className="self-end mr-[10px]">
        <span className="text-[14px] lg:text-[12px]">
          {userChat && userChat.timeStamp}
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
        <img src={userChat && userChat.image} alt="fake profile" />
      </div>
    </div>
  );
}

function AdminMessage({ adminChat }) {
  return (
    <div className="flex gap-x-[10px]">
      <p className="flex items-center py-[10px] px-[20px] text-[20px] bg-[#d9d9d9] rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] lg:text-[15px] lg:py-[8px] lg:px-[27px] lg:leading-[22px] lg:max-w-[315px]">
        {adminChat && adminChat.message}
      </p>
      <span className="self-end text-[14px] lg:text-[12px]">
        {adminChat && adminChat.timeStamp}
      </span>
    </div>
  );
}

function InputMessage() {
  return (
    <div className="flex gap-x-[20px] lg:flex-col gap-y-[20px]">
      <input
        placeholder="收到的包裹與訂單不符"
        className="text-[20px] h-[40px] border border-[#979797] rounded-[15px] px-[15px] w-full lg:text-[15px]"
      />
      <button className="whitespace-nowrap bg-[#D9D9D9] rounded-[15px] py-[10px] w-[100px] text-center text-[20px] lg:text-[15px] lg:w-full lg:tracking-[10px]">
        送出
      </button>
    </div>
  );
}

export default function ChatUser() {
  return (
    <main className="border border-solid border-[#979797] rounded-[15px] max-w-[1425px] min-h-[calc(100vh_-_140px_-_40px_-_40px_-_115px)] mt-[40px] mb-[40px] mx-auto px-[85px] pt-[77px] pb-[80px] flex flex-col overflow-hidden xl:max-w-[1140px] lg:max-w-none lg:p-0 lg:mt-[20px] lg:px-[20px] lg:border-0 lg:min-h-[calc(100vh_-_102px_-_20px_-_20px_-_146px_-_60px)]">
      <div className="mb-auto flex flex-col gap-y-[80px] lg:gap-y-[25px]">
        <UserMessage
          userChat={{
            timeStamp: "14:00",
            name: "黃鵬宇",
            message: "嗨你好",
            image: FakeProfile,
          }}
        />
        <AdminMessage
          adminChat={{
            timeStamp: "14:00",
            message: "你好，有什麼需要為您服務？",
          }}
        />
        <UserMessage
          userChat={{
            timeStamp: "14:00",
            name: "黃鵬宇",
            message: "收到的包裹與訂單不符",
            image: FakeProfile,
          }}
        />
        <AdminMessage
          adminChat={{
            timeStamp: "14:00",
            message: "好的，請提供訂單編號，這邊幫您確認一下，請稍等",
          }}
        />
      </div>
      <InputMessage />
    </main>
  );
}
