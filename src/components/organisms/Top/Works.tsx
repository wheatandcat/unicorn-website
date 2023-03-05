import React from "react";
import Image from "next/image";

type Props = {};

const items = [
  {
    title: "memoir",
    url: "https://memoir-app.dev",
    src: "/memoir.svg",
  },
  {
    title: "peperomia",
    url: "https://peperomia.app",
    src: "/pepromia.svg",
  },
];

const Works: React.FC<Props> = () => (
  <div>
    <h1 className="text-2xl mb-7">Works</h1>
    <div className="flex flex-wrap">
      {items.map((v) => (
        <div key={v.title} className="mb-8 md:mr-20">
          <a
            href="https://memoir-app.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={v.src}
              alt={v.title}
              width={450}
              height={300}
              priority
            />
            <div className="text-sm">{v.title}</div>
            <div className="text-xs font-light">{v.url}</div>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Works;
