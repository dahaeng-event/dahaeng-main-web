"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

interface LogoPathSegment {
  id: string;
  pathData: string;
  pathOffset: number;
}

const LOGO_PATH_EASE = [0.22, 1, 0.36, 1] as const;
const LOGO_DRAW_DURATION_SECONDS = 1.435;
const LOGO_FILL_DURATION_SECONDS = 0.86;
const LOGO_PATH_KEYFRAME_TIMES = [0, 0.24, 0.92, 1] as const;
const LOGO_DRAW_DELAY_SECONDS = 0;
const FILL_FRAME_COUNT = 72;

const roundToFourDecimals = (value: number) => {
  return Number(value.toFixed(4));
};

const createFillProgressValues = () => {
  return Array.from({ length: FILL_FRAME_COUNT + 1 }, (_, frameIndex) => {
    const progress = frameIndex / FILL_FRAME_COUNT;
    const easedProgress = 1 - (1 - progress) ** 3;

    return roundToFourDecimals(easedProgress);
  });
};

const fillProgressValues = createFillProgressValues();
const fillOpacityKeyframes = fillProgressValues;
const strokeOpacityKeyframes = fillProgressValues.map((value) =>
  roundToFourDecimals(1 - value),
);
const fillKeyframeTimes = fillProgressValues;

const logoPathSegments: ReadonlyArray<LogoPathSegment> = [
  {
    id: "letter-d",
    pathData:
      "M6.29,2.52c-.62-.41-1.37-.65-2.17-.65v1.78c1.19,0,2.17,.97,2.17,2.17s-.97,2.17-2.17,2.17-2.17-.97-2.17-2.17H.18c0,2.17,1.77,3.94,3.94,3.94s3.94-1.77,3.94-3.94V0h-1.78V2.52Z",
    pathOffset: 0.02,
  },
  {
    id: "letter-a-first",
    pathData:
      "M12.72,1.87c-2.17,0-3.94,1.77-3.94,3.94s1.77,3.94,3.94,3.94c.8,0,1.54-.24,2.17-.65v.61h1.78v-3.9c0-2.17-1.77-3.94-3.94-3.94Zm0,6.11c-1.19,0-2.17-.97-2.17-2.17s.97-2.17,2.17-2.17,2.17,.97,2.17,2.17-.97,2.17-2.17,2.17Z",
    pathOffset: 0.66,
  },
  {
    id: "letter-h",
    pathData:
      "M21.63,1.87c-.8,0-1.54,.24-2.17,.65V0h-1.78V9.71h1.78v-3.9c0-1.19,.97-2.17,2.17-2.17s2.17,.97,2.17,2.17v3.9h1.78v-3.9c0-2.17-1.77-3.94-3.94-3.94Z",
    pathOffset: 0.03,
  },
  {
    id: "letter-a-second",
    pathData:
      "M30.36,1.87c-2.17,0-3.94,1.77-3.94,3.94s1.77,3.94,3.94,3.94c.8,0,1.54-.24,2.17-.65v.61h1.78v-3.9c0-2.17-1.77-3.94-3.94-3.94Zm0,6.11c-1.19,0-2.17-.97-2.17-2.17s.97-2.17,2.17-2.17,2.17,.97,2.17,2.17-.97,2.17-2.17,2.17Z",
    pathOffset: 0.66,
  },
  {
    id: "letter-e",
    pathData:
      "M39.15,1.88c-2.17,0-3.94,1.76-3.94,3.94s1.76,3.94,3.94,3.94v-1.77c-.88,0-1.64-.53-1.98-1.28h5.81c.07-.29,.1-.58,.1-.89,0-2.17-1.76-3.94-3.94-3.94Zm-1.98,3.05c.34-.75,1.1-1.28,1.98-1.28s1.64,.53,1.98,1.28h-3.95Z",
    pathOffset: 0.54,
  },
  {
    id: "letter-n",
    pathData:
      "M47.94,1.87c-2.17,0-3.94,1.77-3.94,3.94v3.9h1.78v-3.9c0-1.19,.97-2.17,2.17-2.17s2.17,.97,2.17,2.17v3.9h1.78v-3.9c0-2.17-1.77-3.94-3.94-3.94Z",
    pathOffset: 0.83,
  },
  {
    id: "letter-g-upper",
    pathData:
      "M56.72,1.87c-2.17,0-3.94,1.77-3.94,3.94s1.77,3.94,3.94,3.94v-1.78c-1.19,0-2.17-.97-2.17-2.17s.97-2.17,2.17-2.17,2.17,.97,2.17,2.17h1.78c0-2.17-1.77-3.94-3.94-3.94Z",
    pathOffset: 0.64,
  },
  {
    id: "letter-g-lower",
    pathData:
      "M56.72,14.42c-2.17,0-3.94-1.77-3.94-3.94h1.78c0,1.19,.97,2.17,2.17,2.17s2.17-.97,2.17-2.17h1.78c0,2.17-1.77,3.94-3.94,3.94Z",
    pathOffset: 0.04,
  },
];

const createPropertyTransition = (
  times: ReadonlyArray<number>,
  durationSeconds: number,
  delaySeconds: number,
  ease?: Transition["ease"],
): Transition => {
  return {
    duration: durationSeconds,
    delay: delaySeconds,
    times: [...times],
    ease: ease ?? LOGO_PATH_EASE,
  };
};

export const LandingLogoIntro = () => {
  return (
    <div className="mb-8 flex items-center justify-center sm:mb-10">
      <svg
        viewBox="0 -0.4 61.17 15.4"
        className="block h-[60px] w-[270px] overflow-visible sm:h-[72px] sm:w-[330px]"
        aria-hidden="true"
      >
        <circle cx="1.4" cy="3.24" r="1.4" fill="#778fed" />
        <circle cx="59.77" cy="8.29" r="1.4" fill="#778fed" />

        {logoPathSegments.map((logoPathSegment) => (
          <motion.path
            key={logoPathSegment.id}
            d={logoPathSegment.pathData}
            fill="#2a2722"
            stroke="#2a2722"
            strokeWidth={0.28}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            initial={{
              pathLength: 0,
              pathOffset: logoPathSegment.pathOffset,
              fillOpacity: 0,
              strokeOpacity: 1,
            }}
            animate={{
              pathLength: [0, 0.06, 1, 1],
              pathOffset: [
                logoPathSegment.pathOffset,
                logoPathSegment.pathOffset,
                0,
                0,
              ],
              fillOpacity: fillOpacityKeyframes,
              strokeOpacity: strokeOpacityKeyframes,
            }}
            transition={{
              pathLength: createPropertyTransition(
                LOGO_PATH_KEYFRAME_TIMES,
                LOGO_DRAW_DURATION_SECONDS,
                LOGO_DRAW_DELAY_SECONDS,
                "linear",
              ),
              pathOffset: createPropertyTransition(
                LOGO_PATH_KEYFRAME_TIMES,
                LOGO_DRAW_DURATION_SECONDS,
                LOGO_DRAW_DELAY_SECONDS,
                "linear",
              ),
              fillOpacity: createPropertyTransition(
                fillKeyframeTimes,
                LOGO_FILL_DURATION_SECONDS,
                LOGO_DRAW_DELAY_SECONDS + LOGO_DRAW_DURATION_SECONDS,
              ),
              strokeOpacity: createPropertyTransition(
                fillKeyframeTimes,
                LOGO_FILL_DURATION_SECONDS,
                LOGO_DRAW_DELAY_SECONDS + LOGO_DRAW_DURATION_SECONDS,
              ),
            }}
          />
        ))}
      </svg>
    </div>
  );
};
