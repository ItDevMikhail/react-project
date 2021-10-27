import React, { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox.css";
import { Fancybox } from "@fancyapps/ui/dist/fancybox.esm.js";


function FancyBox(props: any) {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    Fancybox.bind(delegate, opts);

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return <>{props.children}</>;
}

export default FancyBox;