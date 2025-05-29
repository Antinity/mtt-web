import Image from "next/image";
import RadiantSphere from "@/components/RadiantSphere";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Landing */}
      <div className="grid grid-cols-1 md:grid-cols-2 container md:space-y-3 justify-center items-center h-screen">
        <div
          id="headline"
          className="space-y-2 flex flex-col items-center md:block"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-shadow">
            Join the <span className="text-yellow-500">competetion</span>,
          </h1>
          <h2 className="text-base md:text-3xl font-bold">
            Get tier tested and find out where{" "}
            <span className="text-yellow-500">YOU</span> belong!
          </h2>
          <div className="mt-4 flex space-x-4">
            <a
              className="font-semibold px-4 py-2 border border-secondary rounded-xl bg-[rgba(255,255,255,0.01)] hover:bg-secondary focus:bg-secondary focus:ring-blue-400 transition cursor-pointer"
              href="https://discord.gg/CwtfYEV6p7"
              target="_blank"
              rel="noopener noreferrer"
            >
              💪 Join Discord & Get Tested
            </a>
            <a className="font-semibold px-4 py-2 border border-secondary rounded-xl bg-[rgba(255,255,255,0.01)] hover:bg-secondary focus:bg-secondary focus:ring-blue-400 transition cursor-pointer">
              📊 View all players
            </a>
          </div>
        </div>

        <div className="bg-secondary shadow-2xl rounded-2xl h-3/4 w-full overflow-hidden">
          <img
            src="/hero.webp"
            className="w-[95%] h-full hover:scale-110 transition duration-300 ease-out"
          />
        </div>
        <RadiantSphere
          x="30%"
          y="50%"
          size={800}
          blurRadius={400}
          color="#0EBCAD"
          animated
        />
      </div>

      {/* Stats */}
      <div
        id="stats"
        className="flex flex-col justify-center items-center w-full h-auto bg-secondary py-16 space-y-8 container rounded-2xl"
      >
        <h2 className="font-bold text-4xl">⭐ Cool Stats ⭐</h2>
        <div className="flex justify-around items-center h-full w-full">
          <div className="flex flex-col items-center justify-center text-foreground">
            <span className="font-bold text-6xl text-yellow-400">2,347+</span>
            <span className="font-bold">Tests Completed</span>
          </div>
          <div className="flex flex-col items-center justify-center text-foreground">
            <span className="font-bold text-6xl text-yellow-400">Sumo</span>
            <span className="font-bold">Top Game Mode</span>
          </div>
          <div className="flex flex-col items-center justify-center text-foreground">
            <span className="font-bold text-6xl text-yellow-400">4m 32s</span>
            <span className="font-bold">Avg. Test Time</span>
          </div>
        </div>
      </div>

      {/* Recent Tests */}
      <div id="recent-tests" className="relative w-full max-w-5xl mt-16">
        <h2 className="font-bold text-3xl mb-6 text-center">🕑 Recent Tests</h2>
        <div className="space-y-6 bg-secondary rounded-xl shadow-lg p-8">
          {[
            { name: "KillStreeek", gamemode: "Sumo", result: "A+" },
            { name: "Antinity", gamemode: "Boxing", result: "B+" },
            { name: "g1qnt", gamemode: "NoDebuff", result: "S" },
            { name: "4ty9", gamemode: "Bridge", result: "C+" },
            { name: "vLucidd", gamemode: "Bedwars", result: "A-" },
          ].map((test, idx, arr) => (
            <div key={idx}>
              <div className="flex items-center justify-between pt-3 pb-5">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground flex items-center gap-3">
                    <img
                      src={`https://mc-heads.net/avatar/${test.name}`}
                      alt={`${test.name} Skin`}
                      className="h-12 rounded"
                    />
                    <div className="flex flex-col">
                      {test.name}
                      <span className="text-sm text-gray-400">
                        {test.gamemode}
                      </span>
                    </div>
                  </span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">
                  {test.result}
                </span>
              </div>

              {idx !== arr.length - 1 && (
                <div className="h-px w-full bg-[rgba(255,255,255,0.1)]" />
              )}
            </div>
          ))}
        </div>

        <RadiantSphere
          x="70%"
          y="30%"
          size={400}
          blurRadius={400}
          color="#0EBCAD"
        />
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="w-full max-w-5xl mt-20">
        <h2 className="font-bold text-3xl mb-8 text-center">
          💬 What Players Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
          {/* Testimonial 1 */}
          <div className="md:col-span-2 row-span-2 bg-secondary rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <p className="text-lg text-foreground font-semibold mb-4">
                &quot;i was kinda nervous to do it ngl, but the whole thing felt smooth. the test didn’t just show where i messed up, it showed where i’m actually strong too. appreciate that.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://mc-heads.net/avatar/KillStreeek"
                alt="KillStreeek"
                className="h-10 rounded-full"
              />
              <div>
                <span className="font-bold text-foreground">KillStreeek</span>
                <div className="text-sm text-gray-400">Sumo Main</div>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="md:col-span-2 bg-secondary rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <p className="text-lg text-foreground font-semibold mb-4">
              &quot;i’ve been playing for years and never really got proper feedback. this was the first time someone broke down my gameplay in a way that clicked.&quot;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://mc-heads.net/avatar/Antinity"
                alt="Antinity"
                className="h-10 rounded-full"
              />
              <div>
                <span className="font-bold text-foreground">Antinity</span>
                <div className="text-sm text-gray-400">Boxing Enthusiast</div>
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-secondary rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <p className="text-base text-foreground mb-4 font-semibold">
              &quot;got tested on boxing and the dude was solid.&quot;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://mc-heads.net/avatar/g1qnt"
                alt="g1qnt"
                className="h-10 rounded-full"
              />
              <div>
                <span className="font-bold text-foreground">g1qnt</span>
                <div className="text-sm text-gray-400">NoDebuff Grinder</div>
              </div>
            </div>
          </div>
          {/* Testimonial 4 */}
          <div className="bg-secondary rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <p className="text-base text-foreground mb-4 font-semibold">
              &quot;the way each gamemode got judged felt super fair.&quot;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://mc-heads.net/avatar/4ty9"
                alt="4ty9"
                className="h-10 rounded-full"
              />
              <div>
                <span className="font-bold text-foreground">4ty9</span>
                <div className="text-sm text-gray-400">Bridge Player</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How To Get Tier Tested */}
      <div id="how-to" className="w-full max-w-5xl mt-20 relative">
        <h2 className="font-bold text-3xl mb-8 text-center">
          📝 How to Get Tier Tested
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-secondary rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-yellow-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl mb-4 shadow-md">
              1
            </div>
            <h3 className="font-bold text-xl mb-2">Join the Discord</h3>
            <p className="text-foreground mb-4">
              Join our Discord server to start your tier test journey.
            </p>
            <a
              href="https://discord.gg/CwtfYEV6p7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-yellow-400 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-yellow-400 hover:text-black transition font-semibold"
            >
              Join Discord
            </a>
          </div>
          {/* Step 2 */}
          <div className="bg-secondary rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-yellow-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl mb-4 shadow-md">
              2
            </div>
            <h3 className="font-bold text-xl mb-2">Open a Testing Ticket</h3>
            <p className="text-foreground mb-4">
              In Discord, create a{" "}
              <span className="font-semibold">testing ticket</span> and select
              your preferred game mode.
            </p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold mb-2">
              Sumo, Boxing, NoDebuff, Bridge, Bedwars & more
            </span>
          </div>
          {/* Step 3 */}
          <div className="bg-secondary rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-yellow-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl mb-4 shadow-md">
              3
            </div>
            <h3 className="font-bold text-xl mb-2">Fight & Get Your Tier</h3>
            <p className="text-foreground mb-4">
              When a tester is ready, log in to{" "}
              <span className="font-semibold">minemen.club</span> and play your
              FT3 set. Your tier will be awarded after the matches!
            </p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
              Good luck!
            </span>
          </div>
        </div>
        <RadiantSphere
          x="30%"
          y="30%"
          size={400}
          blurRadius={400}
          color="#0EBCAD"
        />
      </div>
    </div>
  );
}
