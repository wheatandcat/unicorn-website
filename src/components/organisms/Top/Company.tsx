import React from "react";

type Props = {};

const Works: React.FC<Props> = () => (
  <div className="mb-20">
    <h1 className="text-2xl mb-7">UNICORN.LLC</h1>
    <div className="font-light">
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">社名</div>
        <div>合同会社UNICORN / UNICORN.LLC</div>
      </div>
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">代表社員</div>
        <div>飯野陽平</div>
      </div>
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">設立年月</div>
        <div>2022年12月</div>
      </div>
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">事業内容</div>
        <div>Webサイト企画・制作、システム開発、アプリ開発</div>
      </div>
      <div className="mb-8" />
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">GitHub</div>
        <div>
          <a
            href="https://github.com/wheatandcat"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/wheatandcat
          </a>
        </div>
      </div>
      <div className="flex md:flex-row flex-col mb-4 md:mb-2">
        <div className="w-40 md:font-light font-bold">Blog</div>
        <div>
          <a
            href="https://www.wheatandcat.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.wheatandcat.me
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Works;
