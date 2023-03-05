import React from "react";
import { FeedItem } from "@/lib/feed";
import dayjs from "dayjs";

type Props = {
  feedItems: FeedItem[];
};

const News: React.FC<Props> = (props) => (
  <div>
    <h1 className="text-2xl mb-7">Tech blog</h1>
    <div>
      <div className="my-2">
        <span className="bg-gray-300 py-1 px-2 text-xs font-bold">Hatena</span>
      </div>
      <div className="font-light">
        {props.feedItems
          .filter((v) => v.type === "hatena")
          .slice(0, 3)
          .map((v) => (
            <div key={v.title} className="mb-5">
              <div>{dayjs(v.createdAt).format("YYYY-MM-DD")}</div>
              <a href={v.url} target="_blank" rel="noopener noreferrer">
                {v.title}
              </a>
            </div>
          ))}
        <div className="pt-3 pb-8">
          <div className="text-xs">
            <a
              href="https://www.wheatandcat.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              もっと読む
            </a>
          </div>
        </div>
      </div>
      <div className="my-2">
        <span className="bg-gray-300 py-1 px-2 text-xs font-bold">Zenn</span>
      </div>
      <div className="font-light">
        {props.feedItems
          .filter((v) => v.type === "zenn")
          .map((v) => (
            <div key={v.title} className="mb-5">
              <div>{dayjs(v.createdAt).format("YYYY-MM-DD")}</div>
              <div>
                <a href={v.url} target="_blank" rel="noopener noreferrer">
                  {v.title}
                </a>
              </div>
            </div>
          ))}
        <div className="pt-3 pb-8">
          <div className="text-xs">
            <a
              href="https://zenn.dev/wheatandcat"
              target="_blank"
              rel="noopener noreferrer"
            >
              もっと読む
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default News;
