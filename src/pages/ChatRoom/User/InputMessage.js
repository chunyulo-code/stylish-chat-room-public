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
          picture: profile.user.picture,
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
      className="mt-[40px] flex gap-x-[20px] gap-y-[20px] lg:flex-col"
      onSubmit={(event) => {
        handleSendMessage(event);
        sendMessageToSocket();
      }}
    >
      <input
        placeholder="收到的包裹與訂單不符"
        value={sentMessage}
        className="h-[40px] w-full rounded-full border border-[#979797] px-[15px] text-sm lg:text-[15px]"
        onChange={handleChange}
      />
      <button
        className="w-[100px] whitespace-nowrap rounded-lg bg-[#D9D9D9] py-[10px] text-center text-sm lg:w-full lg:rounded-full lg:text-[15px] lg:tracking-[10px]"
        type="submit"
      >
        送出
      </button>
    </form>
  );
}

export default InputMessage;
