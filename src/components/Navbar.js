import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-center h-16 px-6 shadow">
      <div className="container flex items-center justify-between h-full">
        {/* Left: Logo */}
        <div className="text-2xl font-bold">MTT</div>

        {/* Center: Search Box */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search for a player"
            disabled
            className="w-full max-w-sm px-4 py-2 border border-secondary rounded-xl hover:bg-secondary focus:outline-none focus:bg-secondary focus:ring-blue-400 transition cursor-not-allowed"
          />
        </div>

        {/* Right: Nav Links */}
        <div className="flex items-center space-x-6">
          <a
            href="https://discord.gg/CwtfYEV6p7"
            target="_blank"
            rel="noopener noreferrer"
            className="transition text-foreground hover:text-white"
          >
            Discord
          </a>
          <a
            href="#tier-list"
            className="transition text-foreground hover:text-white cursor-not-allowed">
            Tier List
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
