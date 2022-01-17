import Navigation from "@components/Navigation";

const Dashboard = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 min-h-screen">
      <Navigation></Navigation>
      <div className="">Contents</div>
      <footer className="">testing</footer>
    </div>
  );
};

export default Dashboard;
