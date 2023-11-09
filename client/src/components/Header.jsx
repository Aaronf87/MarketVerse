export default function Header(props) {
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-300 p-5 shadow-lg">
      {props.children}
    </header>
  );
}
