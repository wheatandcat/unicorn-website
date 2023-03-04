import React from "react";
import Main from "@/components/organisms/Top/Main";
import News from "@/components/organisms/Top/News";
import Works from "@/components/organisms/Top/Works";
import { FeedItem } from "@/lib/feed";

type Props = {
  feedItems: FeedItem[];
};

const Page: React.FC<Props> = (props) => (
  <div>
    <Main />
    <News feedItems={props.feedItems} />
    <div className="border-black border mb-4" />
    <Works />
    <div className="border-black border" />
  </div>
);

export default Page;
