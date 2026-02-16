"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useEffect, useState } from "react";

interface LogoPathSegment {
  id: string;
  pathData: string;
  pathOffset: number;
}

interface LogoPathSegmentSource {
  id: string;
  svgPath: string;
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

const logoPathSegmentSources: ReadonlyArray<LogoPathSegmentSource> = [
  {
    id: "letter-d",
    svgPath: "/landing/logo-paths/letter-d.svg",
    pathOffset: 0.02,
  },
  {
    id: "letter-a-first",
    svgPath: "/landing/logo-paths/letter-a-first.svg",
    pathOffset: 0.66,
  },
  {
    id: "letter-h",
    svgPath: "/landing/logo-paths/letter-h.svg",
    pathOffset: 0.03,
  },
  {
    id: "letter-a-second",
    svgPath: "/landing/logo-paths/letter-a-second.svg",
    pathOffset: 0.66,
  },
  {
    id: "letter-e",
    svgPath: "/landing/logo-paths/letter-e.svg",
    pathOffset: 0.54,
  },
  {
    id: "letter-n",
    svgPath: "/landing/logo-paths/letter-n.svg",
    pathOffset: 0.83,
  },
  {
    id: "letter-g-upper",
    svgPath: "/landing/logo-paths/letter-g-upper.svg",
    pathOffset: 0.64,
  },
  {
    id: "letter-g-lower",
    svgPath: "/landing/logo-paths/letter-g-lower.svg",
    pathOffset: 0.04,
  },
];

const extractPathData = (svgText: string) => {
  const matchedPath = svgText.match(/<path[^>]*\sd=["']([^"']+)["']/);

  return matchedPath?.[1] ?? "";
};

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
  const [pathDataById, setPathDataById] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;

    const loadPathData = async () => {
      const pathDataEntries = await Promise.all(
        logoPathSegmentSources.map(async (source) => {
          try {
            const response = await fetch(source.svgPath);

            if (!response.ok) {
              return [source.id, ""] as const;
            }

            const svgText = await response.text();
            return [source.id, extractPathData(svgText)] as const;
          } catch {
            return [source.id, ""] as const;
          }
        }),
      );

      if (!isMounted) {
        return;
      }

      setPathDataById(Object.fromEntries(pathDataEntries));
    };

    void loadPathData();

    return () => {
      isMounted = false;
    };
  }, []);

  const logoPathSegments = logoPathSegmentSources
    .map((source) => {
      return {
        id: source.id,
        pathData: pathDataById[source.id] ?? "",
        pathOffset: source.pathOffset,
      };
    })
    .filter((segment): segment is LogoPathSegment => {
      return segment.pathData.length > 0;
    });

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
            strokeLinecap="round"
            strokeLinejoin="round"
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
