import Header from "./Header";
import Dashboard from "./Dashboard";

const Main = () => {
   return (
      <main className="flex flex-col  w-screen h-screen">
         <section className="flex flex-col gap-[2vw] px-[8vw]">
            <Header />
            <hr className="text-card border-2" />
            <Dashboard />
         </section>
      </main>
   );
};

export default Main;
