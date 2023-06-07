function AdminMessage({ adminChat }) {
  return (
    <div className="flex gap-x-[10px]">
      <p className="rounded-bl-[15px] rounded-br-[15px] rounded-tr-[15px] bg-[#d9d9d9] px-3 py-2 text-sm lg:max-w-[315px] lg:leading-[22px]">
        {adminChat && adminChat.message}
      </p>
      <span className="self-end text-xs">
        {adminChat && adminChat.time_stamp}
      </span>
    </div>
  );
}

export default AdminMessage;
