function Loading({ icon }) {
  return (
    <div className="absolute left-[50%] top-[50%] h-[40px] w-[40px] translate-x-[-50%] translate-y-[-50%] rounded-[50%]">
      <img src={icon} alt="loading" className="rounded-[50%]" />
    </div>
  );
}

export default Loading;
