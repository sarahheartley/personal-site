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

/* ---- Overworld map tiles (16x16 unless noted) ---- */

export const tree: Sprite = {
  rows: [
    "......gggg......",
    "....gggggggg....",
    "...ggGgggggGg...",
    "..gggggggGgggg..",
    "..gGgggggggggg..",
    ".gggggGggggGggg.",
    ".ggGggggggggggg.",
    ".gggggggGgggGgg.",
    "..ggGggggggggg..",
    "..gggggggGgggg..",
    "...ggggggggdg...",
    ".....ddgggd.....",
    "......tttt......",
    "......tttt......",
    "......tTtt......",
    ".....tttttt.....",
  ],
  palette: { g: "#3f9a4c", G: "#7cc96a", d: "#2c6e3a", t: "#7a4a2a", T: "#5a341d" },
};

export const bush: Sprite = {
  rows: [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "......gggg......",
    "....ggGgggggg...",
    "...gGggggGgggg..",
    "..gggggggggGggg.",
    "..ggGgggggggggg.",
    "..ddggggGgggdd..",
    "....dddddddd....",
    "................",
  ],
  palette: { g: "#4aa858", G: "#8ed878", d: "#2c6e3a" },
};

export const flowers: Sprite = {
  rows: [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "...p.......y....",
    "..pyp.....yoy...",
    "...p...w...y....",
    "...g..wyw..g....",
    "...g...w...g....",
    "...g...g...g....",
    "................",
    "................",
  ],
  palette: { p: "#f06ba0", y: "#ffd84a", o: "#f29a3c", w: "#ffffff", g: "#2c6e3a" },
};

export const house: Sprite = {
  rows: [
    "......rrrr......",
    ".....rRRRRr.....",
    "....rRRRRRRr....",
    "...rRRRRRRRRr...",
    "..rRRRRRRRRRRr..",
    ".rrrrrrrrrrrrrr.",
    "..wwwwwwwwwwww..",
    "..wbbwwwwwwbbw..",
    "..wbbwwwwwwbbw..",
    "..wwwwwddwwwww..",
    "..wwwwwddwwwww..",
    "..wwwwwddkwwww..",
    "..wwwwwddwwwww..",
    "..ssssssssssss..",
    "................",
    "................",
  ],
  palette: {
    r: "#a83a5e",
    R: "#e0558a",
    w: "#fff3df",
    b: "#7cc6f0",
    d: "#7a4a2a",
    k: "#ffd84a",
    s: "#b8a48a",
  },
};

/** 24x24 castle that sits behind the final level node. */
export const castle: Sprite = {
  rows: [
    "....f...........f.......",
    "....ff..........ff......",
    "....f...........f.......",
    "...sss.........sss......",
    "..s.s.s.......s.s.s.....",
    "..sssss.......sssss.....",
    "..sSsss.s.s.s.sssSs.....",
    "..sssssssssssssssss.....",
    "..sssssSsssssssssss.....",
    "..ssssssssssssSssss.....",
    "..sSsssssssssssssss.....",
    "..sssssssddddsssSss.....",
    "..ssssssddddddsssss.....",
    "..sssSsddddddddssss.....",
    "..sssssddddddddssss.....",
    "..sssssddddddddsSss.....",
    "..ssssssssssssssssss....",
    "........................",
  ],
  palette: { s: "#c9c3d6", S: "#9a92ad", d: "#4a3242", f: "#f06ba0" },
};
