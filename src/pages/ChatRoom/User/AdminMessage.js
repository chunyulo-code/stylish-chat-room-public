function AdminMessage({ adminChat }) {
  return (
    <div className="flex gap-x-[10px] last:mb-[80px]">
      <p className="flex items-center py-[10px] px-[20px] text-[20px] bg-[#d9d9d9] rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] lg:text-[15px] lg:py-[8px] lg:px-[27px] lg:leading-[22px] lg:max-w-[315px]">
        {adminChat && adminChat.message}
      </p>
      <span className="self-end text-[14px] lg:text-[12px]">
        {adminChat && adminChat.time_stamp}
      </span>
    </div>
  );
}

export default AdminMessage;
