export type Vector = [number, number, number];
export type VectorArray = Vector[][];

export const getStepPercentage = (
  sectionSteps: number,
  sectionPercentage: number,
) => {
  const currSectionStep = Math.floor(sectionPercentage * sectionSteps);
  const stepPercentage =
    sectionPercentage / (1 / sectionSteps) - currSectionStep;

  return stepPercentage;
};

export const getFromAndToVector = (
  vectorArray: VectorArray,
  section: number,
  sectionStep: number,
) => {
  const from = vectorArray[section]?.[sectionStep];
  const to =
    vectorArray[section]?.[sectionStep + 1] ?? vectorArray[section + 1]?.[0];

  return [from, to];
};

export const getFromAndToNumber = (
  numberArray: number[][],
  section: number,
  sectionStep: number,
) => {
  const from = numberArray[section]?.[sectionStep];
  const to =
    numberArray[section]?.[sectionStep + 1] ?? numberArray[section + 1]?.[0];

  return [from, to];
};

export const calculateProgress = (
  a: number,
  b: number,
  progressPercentage: number,
) => a + (b - a) * progressPercentage;

export const calculateVector = (
  v1: Vector,
  v2: Vector,
  progressPercentage: number,
): Vector => {
  const x = calculateProgress(v1[0], v2[0], progressPercentage);
  const y = v1[1] + (v2[1] - v1[1]) * progressPercentage;
  const z = v1[2] + (v2[2] - v1[2]) * progressPercentage;

  return [x, y, z];
};
