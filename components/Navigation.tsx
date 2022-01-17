const Navigation = () => {
  return (
    <>
      <nav className="mt-20 mb-10 items-center justify-center sm:justify-between flex h-12">
        <div className="flex items-center">tredoux</div>
        <ul className="hidden sm:flex items-center gap-10">
          <li>home</li>
          <li>about</li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
