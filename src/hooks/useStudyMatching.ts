import { useState, useEffect, useCallback } from "react";

export default function useStudyMatching(
  peopleCount: number | null,
  availableStudentsCount: number,
) {
  const [isMatching, setIsMatching] = useState(false);
  const [matchingDone, setMatchingDone] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const targetCount = peopleCount ?? 1;
  const isThreeOrMore = targetCount >= 4;

  const maxAllowed = isThreeOrMore ? availableStudentsCount : targetCount;

  // Matching progress
  useEffect(() => {
    if (!isMatching || matchingProgress >= 100) return;

    const interval = setInterval(() => {
      setMatchingProgress((prev) => Math.min(prev + 1, 100));
    }, 5);

    return () => clearInterval(interval);
  }, [isMatching, matchingProgress]);

  // Finish matching after reaching 100%
  useEffect(() => {
    if (!isMatching || matchingProgress < 100) return;

    const timeout = setTimeout(() => {
      setSelectedStudentIds([]);
      setIsMatching(false);
      setMatchingDone(true);
    }, 350);

    return () => clearTimeout(timeout);
  }, [isMatching, matchingProgress]);

  const handleMatching = useCallback(() => {
    setMatchingProgress(0);
    setMatchingDone(false);
    setSelectedStudentIds([]);
    setIsMatching(true);
  }, []);

  const resetMatching = useCallback(() => {
    setIsMatching(false);
    setMatchingDone(false);
    setMatchingProgress(0);
    setSelectedStudentIds([]);
  }, []);

  const toggleStudent = useCallback(
    (id: string) => {
      setSelectedStudentIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }

        if (prev.length >= maxAllowed) {
          if (maxAllowed === 1) {
            return [id];
          }

          return prev;
        }

        return [...prev, id];
      });
    },
    [maxAllowed],
  );

  const canStart = selectedStudentIds.length >= 1;

  const isMaxReached = selectedStudentIds.length === maxAllowed;

  return {
    isMatching,
    setIsMatching,

    matchingDone,
    setMatchingDone,

    matchingProgress,

    selectedStudentIds,
    setSelectedStudentIds,

    targetCount,
    isThreeOrMore,
    maxAllowed,

    handleMatching,
    toggleStudent,
    resetMatching,

    canStart,
    isMaxReached,
  };
}
