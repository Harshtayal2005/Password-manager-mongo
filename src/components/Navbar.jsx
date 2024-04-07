import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-sky-950 px-10 flex justify-between md:px-40 items-center h-[3rem] text-white">
        <div className="font-bold text-[1.3rem]">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

        <a href="https://github.com/Harshtayal2005" target="_blank">
          <button className="flex gap-1 bg-green-800 py-[0.3rem] px-[0.5rem] rounded-3xl items-center justify-center ring-white ring-1">
            <div>
              <FaGithub size={25} />
            </div>
            <div>
              <span>GitHub</span>
            </div>
          </button>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
