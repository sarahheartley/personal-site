/**
 * Pixel art as text grids: each character is one pixel, looked up in the
 * palette. Characters missing from the palette (like ".") are transparent.
 */
export interface Sprite {
  rows: string[];
  palette: Record<string, string>;
}

export const sarah: Sprite = {
  rows: [
    "....hhhhhh....",
    "...hhhhhhhh...",
    "..hhhhhhhhhh..",
    "..hhsssssshh..",
    "..hsessssesh..",
    "..hssssssssh..",
    "..hhsssssshh..",
    ".hhhtttttthhh.",
    ".hhtttggttthh.",
    ".hsttttttttsh.",
    ".hstbbbbbbtsh.",
    "..htttttttth..",
    "...TTT..TTT...",
    "....ll..ll....",
    "....ll..ll....",
    "...ooo..ooo...",
  ],
  palette: {
    h: "#6b3e26",
    s: "#f5c9a4",
    e: "#2b1b14",
    t: "#ec6fa3",
    T: "#c2457d",
    b: "#5a3b22",
    g: "#e9b949",
    l: "#4a3242",
    o: "#5a3b22",
  },
};

/** Marcy: a medium-haired torbie (tortoiseshell tabby). */
export const marcy: Sprite = {
  rows: [
    "k......k..",
    "kk....kk..",
    "kkookkkk..",
    "kykkkkyk..",
    "kkkkpkok..",
    ".kkkkkk...",
    ".knkookk..",
    ".kkkookkk.",
    ".okkknkkko",
    ".kk..kk.oo",
  ],
  palette: {
    k: "#3a2a24",
    o: "#d9823b",
    n: "#7a5a3c",
    y: "#9be36b",
    p: "#e88a9a",
  },
};

/** Butters: a flame point Siamese. */
export const butters: Sprite = {
  rows: [
    "P......P..",
    "PP....PP..",
    "cPccccPc..",
    "cPbPPbPc..",
    "ccPPpPcc..",
    ".cccccc...",
    ".cccccc...",
    ".ccccccc..",
    ".cccccccP.",
    ".PP..PP.PP",
  ],
  palette: {
    c: "#f7ead2",
    P: "#e07a3c",
    b: "#4aa3ff",
    p: "#e88a9a",
  },
};

export const heart: Sprite = {
  rows: [".hh.hh.", "hhhhhhh", "hhhhhhh", ".hhhhh.", "..hhh..", "...h..."],
  palette: { h: "#ff6b8f" },
};

export const sun: Sprite = {
  rows: [
    "y..y..y",
    ".yyyyy.",
    ".yyyyy.",
    "yyyyyyy",
    ".yyyyy.",
    ".yyyyy.",
    "y..y..y",
  ],
  palette: { y: "#ffcc3d" },
};

export const moon: Sprite = {
  rows: [
    "..mmm..",
    ".mm....",
    "mm.....",
    "mm.....",
    "mm.....",
    ".mm....",
    "..mmm..",
  ],
  palette: { m: "#fff1a8" },
};

export const emblem: Sprite = {
  rows: [
    "...g...",
    "...g...",
    "ggggggg",
    ".ggggg.",
    "..ggg..",
    ".gg.gg.",
    "gg...gg",
  ],
  palette: { g: "#f2c96b" },
};

export const campfire: Sprite = {
  rows: [
    "...y....",
    "..yoy...",
    "..oro...",
    ".orrro..",
    ".orrro..",
    "..ror...",
    "w.www.w.",
    ".wwwww..",
  ],
  palette: { y: "#ffe08a", o: "#f29a3c", r: "#e8574a", w: "#6b4229" },
};
