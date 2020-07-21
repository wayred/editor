import React from "react";
import {Tab, Tabs} from "@blueprintjs/core";
import PropPanel from "./properties/PropPanel";

const TabbedPane = () => {
  return (
    <div>
      <Tabs>
        <Tab id="props" title="Properties" panel={<PropPanel />} />
      </Tabs>
    </div>
  )
};

export default TabbedPane;