function Loading({ icon }) {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50px] h-[50px] rounded-[50%]">
      <img src={icon} alt="loading" className="rounded-[50%]" />
    </div>
  );
}

export default Loading;
