import "./index.css";
import { Composition } from "remotion";
import { ProfileIntro } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ProfileIntro"
      component={ProfileIntro}
      durationInFrames={168}
      fps={24}
      width={1200}
      height={480}
    />
  );
};
