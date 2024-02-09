import CreateLink from "../components/CreateLink"

const Home = () => {
  return (
    <main>
      <section className="">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto justify-center text-center px-2 my-20">
          <span className=" mx-auto bg-[#FEE5E4] px-2 py-1  block border border-accentRed text-black">
            Cut short your long links in no time 🚀
          </span>
          <h1 className="text-3xl md:text-6xl">
            Long links sharing Made Easy with{" "}
            <span className="text-accentRed font-semibold">Quick Quip</span>
          </h1>
        </div>
      </section>
      <section className="mx-2">
        <CreateLink/>
      </section>
    </main>
  )
}

export default Home
