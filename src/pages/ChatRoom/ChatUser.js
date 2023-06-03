import Split from "react-split";

export default function ChatUser() {
  return (
    <>
      <Split
        sizes={[25, 75]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="flex"
      >
        <h1 className="text-3xl font-bold underline bg-sky-400">Hello Admin</h1>
        <h2 className="text-2xl font-bold underline bg-violet-400">
          Hello Admin
        </h2>
      </Split>
    </>
  );
}
