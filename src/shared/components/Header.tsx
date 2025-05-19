interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="bg-primary text-white p-3">
      <h1 className="m-0">{title}</h1>
    </header>
  );
}

export default Header;
