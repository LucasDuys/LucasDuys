import "./index.css";
import { Composition } from "remotion";
import { ProfileIntro } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ProfileIntro"
      component={ProfileIntro}
      durationInFrames={96}
      fps={24}
      width={960}
      height={384}
    />
  );
};
