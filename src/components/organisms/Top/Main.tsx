import Image from "next/image";

const Main = () => (
  <div>
    <div>
      <Image
        src="/logo.svg"
        alt="unicorn Logo"
        width={100}
        height={24}
        priority
      />
    </div>
    <div className="py-4">
      <Image
        src="/main_screen.jpg"
        alt="main screen"
        width={1000}
        height={600}
        priority
      />
    </div>
  </div>
);

export default Main;
