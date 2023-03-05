import React from "react";
import Main from "@/components/organisms/Top/Main";
import News from "@/components/organisms/Top/News";
import Works from "@/components/organisms/Top/Works";
import Company from "@/components/organisms/Top/Company";
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
    <div className="border-black border mb-4" />
    <Company />
    <div className="border-black border mb-4" />
    <div className="text-xs text-center py-4">2022 UNICORN.LCC</div>
  </div>
);

export default Page;
