import React from "react";
import Image from "next/image";

type Props = {};

const items = [
  {
    title: "memoir",
    url: "https://memoir-app.dev/",
    src: "/memoir.svg",
  },
  {
    title: "peperomia",
    url: "https://memoir-app.dev/",
    src: "/pepromia.svg",
  },
];

const Works: React.FC<Props> = () => (
  <div>
    <h1 className="text-2xl mb-7">Works</h1>
    <div className="flex flex-wrap">
      {items.map((v) => (
        <div key={v.title} className="mb-8 mr-20">
          <Image src={v.src} alt="memoir" width={450} height={300} priority />
          <div className="text-sm">memoir</div>
          <div className="text-xs font-light">
            <a
              href="https://memoir-app.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://memoir-app.dev/
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Works;
