/**
 * Traço Mágico — letra cursiva (modelo escolar com setas)
 * Coordenadas na mesma caixa 0..100 × 0..130
 *
 * Linhas de referência:
 *   TOP  ≈ 14  (ascendente / maiúsculas)
 *   MID  ≈ 56  (altura do corpo / x-height)
 *   BASE ≈ 92  (linha de base)
 *   DESC ≈ 122 (descendentes)
 */
const CURSIVE_TOP = 14;
const CURSIVE_MID = 56;
const CURSIVE_BASE = 92;
const CURSIVE_DESC = 122;

const STROKE_DATA_CURSIVE = {
  /* ========== MAIÚSCULAS ========== */
  A: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 30, y: 70 },
        { x: 42, y: 35 },
        { x: 50, y: CURSIVE_TOP },
        { x: 58, y: 35 },
        { x: 70, y: 70 },
        { x: 78, y: CURSIVE_BASE },
      ],
      [
        { x: 34, y: 68 },
        { x: 42, y: 62 },
        { x: 50, y: 68 },
        { x: 58, y: 62 },
        { x: 72, y: 58 },
      ],
    ],
  },
  B: {
    strokes: [
      [
        { x: 30, y: CURSIVE_TOP },
        { x: 30, y: CURSIVE_BASE },
      ],
      [
        { x: 30, y: CURSIVE_TOP },
        { x: 52, y: CURSIVE_TOP },
        { x: 66, y: 22 },
        { x: 66, y: 34 },
        { x: 52, y: 48 },
        { x: 30, y: 48 },
        { x: 52, y: 48 },
        { x: 70, y: 58 },
        { x: 70, y: 76 },
        { x: 56, y: CURSIVE_BASE },
        { x: 30, y: CURSIVE_BASE },
        { x: 38, y: 86 },
      ],
    ],
  },
  C: {
    strokes: [
      [
        { x: 72, y: 28 },
        { x: 68, y: 18 },
        { x: 52, y: CURSIVE_TOP },
        { x: 32, y: 22 },
        { x: 22, y: 42 },
        { x: 22, y: 68 },
        { x: 32, y: 86 },
        { x: 52, y: CURSIVE_BASE },
        { x: 68, y: 86 },
        { x: 74, y: 76 },
      ],
    ],
  },
  D: {
    strokes: [
      [
        { x: 32, y: CURSIVE_TOP },
        { x: 32, y: CURSIVE_BASE },
        { x: 26, y: 86 },
        { x: 34, y: 78 },
        { x: 52, y: CURSIVE_BASE },
        { x: 72, y: 78 },
        { x: 80, y: 52 },
        { x: 72, y: 26 },
        { x: 52, y: CURSIVE_TOP },
        { x: 36, y: 20 },
      ],
    ],
  },
  E: {
    strokes: [
      [
        { x: 68, y: 24 },
        { x: 58, y: 16 },
        { x: 42, y: CURSIVE_TOP },
        { x: 28, y: 26 },
        { x: 30, y: 42 },
        { x: 44, y: 50 },
        { x: 32, y: 58 },
        { x: 24, y: 72 },
        { x: 32, y: 86 },
        { x: 50, y: CURSIVE_BASE },
        { x: 68, y: 84 },
        { x: 74, y: 74 },
      ],
    ],
  },
  F: {
    strokes: [
      [
        { x: 28, y: 22 },
        { x: 36, y: CURSIVE_TOP },
        { x: 58, y: CURSIVE_TOP },
        { x: 74, y: 18 },
      ],
      [
        { x: 50, y: 22 },
        { x: 50, y: CURSIVE_BASE },
        { x: 38, y: 86 },
        { x: 28, y: CURSIVE_BASE },
      ],
      [{ x: 36, y: 52 }, { x: 62, y: 52 }],
    ],
  },
  G: {
    strokes: [
      [
        { x: 70, y: 28 },
        { x: 62, y: 16 },
        { x: 46, y: CURSIVE_TOP },
        { x: 28, y: 24 },
        { x: 20, y: 48 },
        { x: 24, y: 74 },
        { x: 40, y: CURSIVE_BASE },
        { x: 58, y: 82 },
        { x: 66, y: 62 },
        { x: 62, y: CURSIVE_MID },
        { x: 62, y: CURSIVE_DESC },
        { x: 48, y: 116 },
        { x: 36, y: CURSIVE_DESC - 4 },
        { x: 42, y: 108 },
        { x: 58, y: CURSIVE_BASE },
        { x: 72, y: 86 },
      ],
    ],
  },
  H: {
    strokes: [
      [
        { x: 28, y: 22 },
        { x: 34, y: CURSIVE_TOP },
        { x: 34, y: CURSIVE_BASE },
        { x: 24, y: 84 },
        { x: 28, y: 72 },
      ],
      [
        { x: 66, y: CURSIVE_TOP },
        { x: 66, y: CURSIVE_BASE },
        { x: 58, y: 78 },
        { x: 42, y: 62 },
        { x: 34, y: 58 },
      ],
    ],
  },
  I: {
    strokes: [
      [
        { x: 28, y: 28 },
        { x: 38, y: CURSIVE_TOP },
        { x: 62, y: CURSIVE_TOP },
        { x: 72, y: 24 },
        { x: 66, y: 40 },
        { x: 48, y: 58 },
        { x: 34, y: 78 },
        { x: 42, y: CURSIVE_BASE },
        { x: 62, y: 86 },
        { x: 74, y: 72 },
      ],
    ],
  },
  J: {
    strokes: [
      [
        { x: 30, y: 28 },
        { x: 42, y: CURSIVE_TOP },
        { x: 68, y: CURSIVE_TOP },
        { x: 78, y: 22 },
        { x: 70, y: 40 },
        { x: 62, y: 70 },
        { x: 62, y: CURSIVE_DESC },
        { x: 48, y: 116 },
        { x: 34, y: CURSIVE_DESC - 2 },
        { x: 40, y: 108 },
        { x: 56, y: CURSIVE_BASE },
        { x: 70, y: 82 },
      ],
    ],
  },
  K: {
    strokes: [
      [
        { x: 30, y: CURSIVE_TOP },
        { x: 30, y: CURSIVE_BASE },
      ],
      [
        { x: 72, y: CURSIVE_TOP },
        { x: 58, y: 30 },
        { x: 42, y: 48 },
        { x: 30, y: 54 },
        { x: 44, y: 62 },
        { x: 58, y: 78 },
        { x: 72, y: CURSIVE_BASE },
        { x: 80, y: 84 },
      ],
    ],
  },
  L: {
    strokes: [
      [
        { x: 36, y: 28 },
        { x: 46, y: CURSIVE_TOP },
        { x: 58, y: 22 },
        { x: 52, y: 40 },
        { x: 48, y: 70 },
        { x: 48, y: CURSIVE_BASE },
        { x: 40, y: 86 },
        { x: 52, y: 82 },
        { x: 68, y: CURSIVE_BASE },
        { x: 80, y: 86 },
      ],
    ],
  },
  M: {
    strokes: [
      [
        { x: 18, y: 22 },
        { x: 24, y: CURSIVE_TOP },
        { x: 24, y: CURSIVE_BASE },
        { x: 24, y: 40 },
        { x: 36, y: CURSIVE_TOP + 4 },
        { x: 46, y: 40 },
        { x: 46, y: CURSIVE_BASE },
        { x: 46, y: 40 },
        { x: 58, y: CURSIVE_TOP + 4 },
        { x: 70, y: 40 },
        { x: 70, y: CURSIVE_BASE },
        { x: 80, y: 84 },
      ],
    ],
  },
  N: {
    strokes: [
      [
        { x: 24, y: 22 },
        { x: 30, y: CURSIVE_TOP },
        { x: 30, y: CURSIVE_BASE },
        { x: 30, y: 40 },
        { x: 44, y: CURSIVE_TOP + 4 },
        { x: 60, y: 40 },
        { x: 60, y: CURSIVE_BASE },
        { x: 72, y: 84 },
      ],
    ],
  },
  O: {
    strokes: [
      [
        { x: 50, y: CURSIVE_TOP },
        { x: 32, y: 22 },
        { x: 22, y: 48 },
        { x: 26, y: 76 },
        { x: 44, y: CURSIVE_BASE },
        { x: 66, y: 82 },
        { x: 76, y: 54 },
        { x: 70, y: 26 },
        { x: 54, y: CURSIVE_TOP },
        { x: 46, y: 22 },
        { x: 50, y: 32 },
      ],
    ],
  },
  P: {
    strokes: [
      [
        { x: 32, y: CURSIVE_TOP },
        { x: 32, y: CURSIVE_BASE },
      ],
      [
        { x: 32, y: CURSIVE_TOP },
        { x: 54, y: CURSIVE_TOP },
        { x: 70, y: 24 },
        { x: 72, y: 40 },
        { x: 58, y: 54 },
        { x: 32, y: 54 },
      ],
    ],
  },
  Q: {
    strokes: [
      [
        { x: 50, y: CURSIVE_TOP },
        { x: 32, y: 22 },
        { x: 22, y: 48 },
        { x: 26, y: 76 },
        { x: 44, y: CURSIVE_BASE },
        { x: 66, y: 82 },
        { x: 76, y: 54 },
        { x: 70, y: 26 },
        { x: 54, y: CURSIVE_TOP },
        { x: 50, y: CURSIVE_TOP },
      ],
      [
        { x: 54, y: 78 },
        { x: 66, y: CURSIVE_BASE },
        { x: 78, y: 86 },
        { x: 70, y: CURSIVE_BASE + 4 },
      ],
    ],
  },
  R: {
    strokes: [
      [
        { x: 30, y: CURSIVE_TOP },
        { x: 30, y: CURSIVE_BASE },
      ],
      [
        { x: 30, y: CURSIVE_TOP },
        { x: 52, y: CURSIVE_TOP },
        { x: 68, y: 24 },
        { x: 68, y: 40 },
        { x: 52, y: 52 },
        { x: 30, y: 52 },
        { x: 46, y: 60 },
        { x: 62, y: 78 },
        { x: 74, y: CURSIVE_BASE },
        { x: 82, y: 84 },
      ],
    ],
  },
  S: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 36, y: 70 },
        { x: 52, y: 36 },
        { x: 62, y: CURSIVE_TOP },
        { x: 52, y: 22 },
        { x: 36, y: 28 },
        { x: 30, y: 48 },
        { x: 42, y: 62 },
        { x: 60, y: 74 },
        { x: 68, y: CURSIVE_BASE },
        { x: 52, y: CURSIVE_BASE + 2 },
        { x: 34, y: 86 },
        { x: 42, y: 80 },
        { x: 62, y: CURSIVE_BASE },
        { x: 76, y: 84 },
      ],
    ],
  },
  T: {
    strokes: [
      [
        { x: 22, y: 22 },
        { x: 34, y: CURSIVE_TOP },
        { x: 66, y: CURSIVE_TOP },
        { x: 78, y: 18 },
      ],
      [
        { x: 50, y: 22 },
        { x: 50, y: CURSIVE_BASE },
        { x: 38, y: 86 },
        { x: 28, y: CURSIVE_BASE },
      ],
    ],
  },
  U: {
    strokes: [
      [
        { x: 24, y: 22 },
        { x: 30, y: CURSIVE_TOP },
        { x: 30, y: 70 },
        { x: 38, y: CURSIVE_BASE },
        { x: 54, y: CURSIVE_BASE },
        { x: 66, y: 70 },
        { x: 66, y: CURSIVE_TOP },
        { x: 66, y: CURSIVE_BASE },
        { x: 78, y: 84 },
      ],
    ],
  },
  V: {
    strokes: [
      [
        { x: 24, y: 22 },
        { x: 30, y: CURSIVE_TOP },
        { x: 38, y: 70 },
        { x: 50, y: CURSIVE_BASE },
        { x: 62, y: 70 },
        { x: 70, y: CURSIVE_TOP },
        { x: 78, y: 22 },
        { x: 72, y: 32 },
      ],
    ],
  },
  W: {
    strokes: [
      [
        { x: 16, y: 22 },
        { x: 22, y: CURSIVE_TOP },
        { x: 28, y: 70 },
        { x: 36, y: CURSIVE_BASE },
        { x: 44, y: 70 },
        { x: 50, y: CURSIVE_TOP + 8 },
        { x: 56, y: 70 },
        { x: 64, y: CURSIVE_BASE },
        { x: 72, y: 70 },
        { x: 78, y: CURSIVE_TOP },
        { x: 84, y: 28 },
      ],
    ],
  },
  X: {
    strokes: [
      [
        { x: 26, y: CURSIVE_TOP },
        { x: 36, y: 40 },
        { x: 50, y: 58 },
        { x: 64, y: 76 },
        { x: 74, y: CURSIVE_BASE },
      ],
      [
        { x: 74, y: CURSIVE_TOP },
        { x: 64, y: 40 },
        { x: 50, y: 58 },
        { x: 36, y: 76 },
        { x: 26, y: CURSIVE_BASE },
      ],
    ],
  },
  Y: {
    strokes: [
      [
        { x: 24, y: CURSIVE_TOP },
        { x: 30, y: 50 },
        { x: 40, y: CURSIVE_BASE },
        { x: 54, y: CURSIVE_BASE },
        { x: 64, y: 50 },
        { x: 68, y: CURSIVE_TOP + 6 },
        { x: 66, y: 70 },
        { x: 66, y: CURSIVE_DESC },
        { x: 52, y: 116 },
        { x: 38, y: CURSIVE_DESC - 2 },
        { x: 44, y: 108 },
        { x: 60, y: CURSIVE_BASE },
        { x: 74, y: 84 },
      ],
    ],
  },
  Z: {
    strokes: [
      [
        { x: 24, y: 24 },
        { x: 36, y: CURSIVE_TOP },
        { x: 70, y: CURSIVE_TOP },
        { x: 78, y: 20 },
        { x: 60, y: 48 },
        { x: 40, y: 74 },
        { x: 30, y: CURSIVE_BASE },
        { x: 42, y: 86 },
        { x: 52, y: CURSIVE_BASE },
        { x: 56, y: 108 },
        { x: 48, y: CURSIVE_DESC },
        { x: 34, y: 118 },
        { x: 42, y: 108 },
        { x: 60, y: CURSIVE_BASE },
        { x: 76, y: 84 },
      ],
    ],
  },

  /* ========== MINÚSCULAS ========== */
  a: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 34, y: 74 },
        { x: 48, y: CURSIVE_MID },
        { x: 36, y: 60 },
        { x: 26, y: 72 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 54, y: 74 },
        { x: 56, y: CURSIVE_MID },
        { x: 56, y: CURSIVE_BASE },
        { x: 68, y: 84 },
      ],
    ],
  },
  b: {
    strokes: [
      [
        { x: 28, y: CURSIVE_BASE },
        { x: 38, y: 60 },
        { x: 46, y: 30 },
        { x: 42, y: CURSIVE_TOP },
        { x: 34, y: 28 },
        { x: 32, y: 60 },
        { x: 32, y: CURSIVE_BASE },
        { x: 32, y: 72 },
        { x: 44, y: CURSIVE_MID },
        { x: 58, y: 64 },
        { x: 60, y: 78 },
        { x: 50, y: CURSIVE_BASE },
        { x: 42, y: 86 },
        { x: 54, y: 82 },
        { x: 68, y: CURSIVE_MID + 4 },
      ],
    ],
  },
  c: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 36, y: 74 },
        { x: 50, y: CURSIVE_MID },
        { x: 38, y: 60 },
        { x: 26, y: 70 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 56, y: 80 },
        { x: 64, y: 70 },
      ],
    ],
  },
  d: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 34, y: 74 },
        { x: 46, y: CURSIVE_MID },
        { x: 34, y: 60 },
        { x: 24, y: 72 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 54, y: 74 },
        { x: 56, y: CURSIVE_MID },
        { x: 56, y: CURSIVE_TOP },
        { x: 56, y: CURSIVE_BASE },
        { x: 68, y: 84 },
      ],
    ],
  },
  e: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 40, y: 74 },
        { x: 56, y: 64 },
        { x: 52, y: CURSIVE_MID },
        { x: 38, y: 58 },
        { x: 26, y: 70 },
        { x: 30, y: CURSIVE_BASE - 2 },
        { x: 46, y: CURSIVE_BASE },
        { x: 62, y: 82 },
      ],
    ],
  },
  f: {
    strokes: [
      [
        { x: 28, y: CURSIVE_BASE },
        { x: 40, y: 60 },
        { x: 50, y: 28 },
        { x: 44, y: CURSIVE_TOP },
        { x: 34, y: 24 },
        { x: 36, y: 60 },
        { x: 36, y: CURSIVE_DESC },
        { x: 48, y: 116 },
        { x: 60, y: CURSIVE_DESC - 4 },
        { x: 56, y: 108 },
        { x: 44, y: CURSIVE_BASE },
        { x: 56, y: 84 },
        { x: 68, y: CURSIVE_BASE - 4 },
      ],
    ],
  },
  g: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 34, y: 74 },
        { x: 46, y: CURSIVE_MID },
        { x: 34, y: 60 },
        { x: 24, y: 72 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 54, y: 74 },
        { x: 56, y: CURSIVE_MID },
        { x: 56, y: CURSIVE_DESC },
        { x: 44, y: 116 },
        { x: 32, y: CURSIVE_DESC - 2 },
        { x: 38, y: 108 },
        { x: 54, y: CURSIVE_BASE },
        { x: 68, y: 84 },
      ],
    ],
  },
  h: {
    strokes: [
      [
        { x: 26, y: CURSIVE_BASE },
        { x: 36, y: 60 },
        { x: 44, y: 28 },
        { x: 40, y: CURSIVE_TOP },
        { x: 32, y: 28 },
        { x: 30, y: 60 },
        { x: 30, y: CURSIVE_BASE },
        { x: 30, y: 72 },
        { x: 42, y: CURSIVE_MID },
        { x: 56, y: 64 },
        { x: 56, y: CURSIVE_BASE },
        { x: 68, y: 84 },
      ],
    ],
  },
  i: {
    strokes: [
      [
        { x: 30, y: CURSIVE_BASE },
        { x: 42, y: 72 },
        { x: 48, y: CURSIVE_MID },
        { x: 48, y: CURSIVE_BASE },
        { x: 60, y: 84 },
      ],
      [{ x: 48, y: 36 }, { x: 48, y: 40 }],
    ],
  },
  j: {
    strokes: [
      [
        { x: 34, y: CURSIVE_BASE },
        { x: 46, y: 72 },
        { x: 52, y: CURSIVE_MID },
        { x: 52, y: CURSIVE_DESC },
        { x: 40, y: 116 },
        { x: 28, y: CURSIVE_DESC - 2 },
        { x: 34, y: 108 },
        { x: 50, y: CURSIVE_BASE },
        { x: 64, y: 84 },
      ],
      [{ x: 52, y: 36 }, { x: 52, y: 40 }],
    ],
  },
  k: {
    strokes: [
      [
        { x: 26, y: CURSIVE_BASE },
        { x: 36, y: 60 },
        { x: 44, y: 28 },
        { x: 40, y: CURSIVE_TOP },
        { x: 32, y: 28 },
        { x: 30, y: 60 },
        { x: 30, y: CURSIVE_BASE },
      ],
      [
        { x: 30, y: CURSIVE_BASE },
        { x: 42, y: 74 },
        { x: 52, y: CURSIVE_MID },
        { x: 42, y: 64 },
        { x: 36, y: 72 },
        { x: 48, y: 82 },
        { x: 62, y: CURSIVE_BASE },
        { x: 72, y: 84 },
      ],
    ],
  },
  l: {
    strokes: [
      [
        { x: 30, y: CURSIVE_BASE },
        { x: 42, y: 60 },
        { x: 52, y: 28 },
        { x: 46, y: CURSIVE_TOP },
        { x: 36, y: 28 },
        { x: 38, y: 60 },
        { x: 38, y: CURSIVE_BASE },
        { x: 50, y: 84 },
      ],
    ],
  },
  m: {
    strokes: [
      [
        { x: 16, y: CURSIVE_BASE },
        { x: 24, y: 72 },
        { x: 28, y: CURSIVE_MID },
        { x: 28, y: CURSIVE_BASE },
        { x: 28, y: 70 },
        { x: 38, y: CURSIVE_MID },
        { x: 48, y: 70 },
        { x: 48, y: CURSIVE_BASE },
        { x: 48, y: 70 },
        { x: 58, y: CURSIVE_MID },
        { x: 68, y: 70 },
        { x: 68, y: CURSIVE_BASE },
        { x: 80, y: 84 },
      ],
    ],
  },
  n: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 32, y: 72 },
        { x: 36, y: CURSIVE_MID },
        { x: 36, y: CURSIVE_BASE },
        { x: 36, y: 70 },
        { x: 48, y: CURSIVE_MID },
        { x: 60, y: 70 },
        { x: 60, y: CURSIVE_BASE },
        { x: 72, y: 84 },
      ],
    ],
  },
  o: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 34, y: 74 },
        { x: 48, y: CURSIVE_MID },
        { x: 36, y: 60 },
        { x: 26, y: 72 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 54, y: 74 },
        { x: 56, y: CURSIVE_MID },
        { x: 48, y: CURSIVE_MID + 2 },
        { x: 62, y: CURSIVE_MID },
        { x: 72, y: CURSIVE_MID + 4 },
      ],
    ],
  },
  p: {
    strokes: [
      [
        { x: 26, y: CURSIVE_BASE },
        { x: 38, y: 72 },
        { x: 44, y: CURSIVE_MID },
        { x: 44, y: CURSIVE_DESC },
        { x: 44, y: 72 },
        { x: 56, y: CURSIVE_MID },
        { x: 68, y: 66 },
        { x: 70, y: 80 },
        { x: 58, y: CURSIVE_BASE },
        { x: 48, y: 86 },
        { x: 56, y: 82 },
        { x: 70, y: CURSIVE_MID + 6 },
      ],
    ],
  },
  q: {
    strokes: [
      [
        { x: 22, y: CURSIVE_BASE },
        { x: 34, y: 74 },
        { x: 46, y: CURSIVE_MID },
        { x: 34, y: 60 },
        { x: 24, y: 72 },
        { x: 28, y: CURSIVE_BASE - 4 },
        { x: 42, y: CURSIVE_BASE },
        { x: 54, y: 74 },
        { x: 56, y: CURSIVE_MID },
        { x: 56, y: CURSIVE_DESC },
        { x: 56, y: 108 },
        { x: 64, y: CURSIVE_BASE },
        { x: 76, y: 84 },
      ],
    ],
  },
  r: {
    strokes: [
      [
        { x: 26, y: CURSIVE_BASE },
        { x: 38, y: 72 },
        { x: 46, y: CURSIVE_MID },
        { x: 54, y: CURSIVE_MID + 2 },
        { x: 52, y: 70 },
        { x: 52, y: CURSIVE_BASE },
        { x: 64, y: 84 },
      ],
    ],
  },
  s: {
    strokes: [
      [
        { x: 26, y: CURSIVE_BASE },
        { x: 40, y: 72 },
        { x: 52, y: CURSIVE_MID },
        { x: 42, y: 60 },
        { x: 30, y: 72 },
        { x: 36, y: CURSIVE_BASE },
        { x: 50, y: CURSIVE_BASE },
        { x: 58, y: 82 },
        { x: 52, y: 76 },
        { x: 42, y: 80 },
      ],
    ],
  },
  t: {
    strokes: [
      [
        { x: 34, y: CURSIVE_BASE },
        { x: 44, y: 60 },
        { x: 48, y: 28 },
        { x: 48, y: CURSIVE_TOP + 8 },
        { x: 48, y: CURSIVE_BASE },
        { x: 60, y: 84 },
      ],
      [{ x: 36, y: CURSIVE_MID }, { x: 60, y: CURSIVE_MID }],
    ],
  },
  u: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 34, y: 72 },
        { x: 38, y: CURSIVE_MID },
        { x: 38, y: CURSIVE_BASE - 4 },
        { x: 48, y: CURSIVE_BASE },
        { x: 58, y: 72 },
        { x: 60, y: CURSIVE_MID },
        { x: 60, y: CURSIVE_BASE },
        { x: 72, y: 84 },
      ],
    ],
  },
  v: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 34, y: 72 },
        { x: 40, y: CURSIVE_MID },
        { x: 48, y: CURSIVE_BASE },
        { x: 58, y: CURSIVE_MID },
        { x: 66, y: CURSIVE_MID + 2 },
        { x: 74, y: CURSIVE_MID },
      ],
    ],
  },
  w: {
    strokes: [
      [
        { x: 16, y: CURSIVE_BASE },
        { x: 24, y: 72 },
        { x: 28, y: CURSIVE_MID },
        { x: 34, y: CURSIVE_BASE },
        { x: 42, y: CURSIVE_MID },
        { x: 50, y: CURSIVE_BASE },
        { x: 58, y: CURSIVE_MID },
        { x: 66, y: CURSIVE_MID + 2 },
        { x: 76, y: CURSIVE_MID },
      ],
    ],
  },
  x: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 36, y: 72 },
        { x: 48, y: CURSIVE_MID },
        { x: 36, y: 70 },
        { x: 28, y: CURSIVE_BASE },
        { x: 40, y: CURSIVE_BASE },
        { x: 52, y: 74 },
        { x: 62, y: CURSIVE_MID },
      ],
      [
        { x: 58, y: CURSIVE_MID },
        { x: 48, y: 74 },
        { x: 36, y: CURSIVE_BASE },
      ],
    ],
  },
  y: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 34, y: 72 },
        { x: 38, y: CURSIVE_MID },
        { x: 38, y: CURSIVE_BASE - 4 },
        { x: 48, y: CURSIVE_BASE },
        { x: 58, y: 72 },
        { x: 60, y: CURSIVE_MID },
        { x: 60, y: CURSIVE_DESC },
        { x: 48, y: 116 },
        { x: 34, y: CURSIVE_DESC - 2 },
        { x: 40, y: 108 },
        { x: 56, y: CURSIVE_BASE },
        { x: 70, y: 84 },
      ],
    ],
  },
  z: {
    strokes: [
      [
        { x: 24, y: CURSIVE_BASE },
        { x: 36, y: 72 },
        { x: 50, y: CURSIVE_MID },
        { x: 58, y: CURSIVE_MID + 4 },
        { x: 46, y: 74 },
        { x: 34, y: CURSIVE_BASE },
        { x: 46, y: 86 },
        { x: 54, y: CURSIVE_BASE },
        { x: 56, y: 108 },
        { x: 46, y: CURSIVE_DESC },
        { x: 32, y: 118 },
        { x: 40, y: 108 },
        { x: 56, y: CURSIVE_BASE },
        { x: 70, y: 84 },
      ],
    ],
  },
};

const CURSIVE_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CURSIVE_LOWER = "abcdefghijklmnopqrstuvwxyz".split("");
const CURSIVE_LETTERS = CURSIVE_UPPER.concat(CURSIVE_LOWER);
