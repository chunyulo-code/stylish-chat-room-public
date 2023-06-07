function InputMessage({
  sentMessage,
  setSentMessage,
  setHistoryMessage,
  sendMessageToSocket,
  profile,
}) {
  // Create time stamp
  const createTimeStamp = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const time_stamp = `${hours}:${minutes}`;
    return time_stamp;
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const time_stamp = createTimeStamp();
    if (sentMessage) {
      if (!profile) return;
      setHistoryMessage((prev) => [
        ...prev,
        {
          message: sentMessage,
          sender_id: profile.user.id,
          time_stamp: time_stamp,
          name: profile.user.name,
        },
      ]);
      setSentMessage("");
    }
  };

  const handleChange = (event) => {
    setSentMessage(event.target.value);
  };

  return (
    <form
      className="flex gap-x-[20px] lg:flex-col gap-y-[20px] mt-[77px]"
      onSubmit={(event) => {
        handleSendMessage(event);
        sendMessageToSocket();
      }}
    >
      <input
        placeholder="收到的包裹與訂單不符"
        value={sentMessage}
        className="text-[20px] h-[40px] border border-[#979797] rounded-[15px] px-[15px] w-full lg:text-[15px]"
        onChange={handleChange}
      />
      <button
        className="whitespace-nowrap bg-[#D9D9D9] rounded-[15px] py-[10px] w-[100px] text-center text-[20px] lg:text-[15px] lg:w-full lg:tracking-[10px]"
        type="submit"
      >
        送出
      </button>
    </form>
  );
}

export default InputMessage;
