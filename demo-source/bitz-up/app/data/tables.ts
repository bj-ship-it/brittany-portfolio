export type Ballroom =
  | "Grand Ballroom"
  | "Sago Palm Ballroom"
  | "Palm Ballroom";

export type TableStatus =
  | "default"
  | "to_visit"
  | "visited"
  | "preorder";

export type EventTable = {
  id: string;
  tableNumber: string;
  ballroom: Ballroom;
  authorName: string;
  authorSlug: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation?: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function table(
  ballroom: Ballroom,
  tableNumber: string,
  authorName: string,
  x: number,
  y: number,
  w: number,
  h: number,
  rotation = 0
): EventTable {
  return {
    id: `${ballroom}-${tableNumber}`,
    tableNumber,
    ballroom,
    authorName,
    authorSlug: slugify(authorName),
    x,
    y,
    w,
    h,
    rotation,
  };
}

export const ballroomImages: Record<Ballroom, string> = {
  "Grand Ballroom": "/brittany-portfolio/demos/bitz-up/maps/grand-ballroom-map.png",
  "Sago Palm Ballroom": "/brittany-portfolio/demos/bitz-up/maps/sago-palm-ballroom-map.png",
  "Palm Ballroom": "/brittany-portfolio/demos/bitz-up/maps/palm-ballroom-map.png",
};

export const eventTables: EventTable[] = [
// =========================
// GRAND BALLROOM
// =========================

table("Grand Ballroom", "1", "KK Allen", 26.9, 92.3, 5.25, 1.75),
table("Grand Ballroom", "2", "Stacy Kestwick", 43.5, 92.3, 5.25, 1.75),
table("Grand Ballroom", "3", "Tracey Jerald", 57.0, 92.3, 5.25, 1.75),
table("Grand Ballroom", "4", "Hailey Dickert", 72.9, 92.3, 5.25, 1.75),

table("Grand Ballroom", "5", "Ari Wright", 87.0, 91.6, 5.25, 1.75, -40),

table("Grand Ballroom", "6", "Kate Hawthorne", 88.8, 81.0, 5.25, 1.75, 90),
table("Grand Ballroom", "7", "BJ Hill", 88.8, 70.2, 5.25, 1.75, 90),
table("Grand Ballroom", "8", "Heather M Orgeron", 88.8, 55.3, 5.25, 1.75, 90),
table("Grand Ballroom", "9", "Harloe Rae", 88.8, 45.8, 5.25, 1.75, 90),
table("Grand Ballroom", "10", "D.W. Cole", 88.8, 33.3, 5.25, 1.75, 90),
table("Grand Ballroom", "11", "Crystal J. Johnson and Felicity Vaughn", 88.8, 17.8, 5.25, 1.75, 90),

table("Grand Ballroom", "12", "Sara Snow", 88.8, 9.4, 5.25, 1.75, 40),

table("Grand Ballroom", "13", "Lillith Carrie", 76.6, 7.2, 5.25, 1.75),
table("Grand Ballroom", "14", "Melissa Ivers", 66.6, 7.2, 5.25, 1.75),
table("Grand Ballroom", "15", "Jibbly", 50.3, 7.2, 11.5, 7.0),
table("Grand Ballroom", "16", "Susan Renee", 34.2, 7.2, 5.25, 1.75),
table("Grand Ballroom", "17", "Tia Louise", 23.4, 7.2, 5.25, 1.75),

table("Grand Ballroom", "18", "Lexi Bissen", 12.5, 9.6, 5.25, 1.75, -40),

table("Grand Ballroom", "19", "Danielle Baker", 10.4, 18.4, 5.25, 1.75, 90),
table("Grand Ballroom", "20", "SJ Sylvis", 10.4, 36.5, 5.25, 1.75, 90),
table("Grand Ballroom", "21", "Jennifer Hartmann", 10.4, 50.0, 5.25, 1.75, 90),
table("Grand Ballroom", "22", "KA Tucker", 10.4, 71.2, 5.25, 1.75, 90),
table("Grand Ballroom", "23", "Willow Aster", 10.4, 84.0, 5.25, 1.75, 90),

table("Grand Ballroom", "24", "Kay Cove", 11.7, 91.6, 5.25, 1.75, 40),

table("Grand Ballroom", "25", "Jenn McMahon", 30.4, 72.9, 5.25, 1.75, 90),
table("Grand Ballroom", "26", "Vinni George", 30.4, 65.1, 5.25, 1.75, 90),
table("Grand Ballroom", "27", "Caitlyn P Tajon", 30.4, 57.5, 5.25, 1.75, 90),
table("Grand Ballroom", "28", "Kristy Marie", 30.4, 50.0, 5.25, 1.75, 90),
table("Grand Ballroom", "29", "Heidi McLaughlin", 30.4, 42.5, 5.25, 1.75, 90),
table("Grand Ballroom", "30", "Norma Marie", 30.4, 34.7, 5.25, 1.75, 90),
table("Grand Ballroom", "31", "Jennifer Sucevic", 30.4, 27.4, 5.25, 1.75, 90),

table("Grand Ballroom", "32", "CM Smith", 35.7, 21.5, 5.25, 1.75),

table("Grand Ballroom", "33", "Fiona Cole", 40.8, 27.4, 5.25, 1.75, 90),
table("Grand Ballroom", "34", "Lucia Franco", 40.8, 34.7, 5.25, 1.75, 90),
table("Grand Ballroom", "35", "Cora Kenborn", 40.8, 42.5, 5.25, 1.75, 90),
table("Grand Ballroom", "36", "Ashley Cade", 40.8, 50.0, 5.25, 1.75, 90),
table("Grand Ballroom", "37", "Alexandra Hale", 40.8, 57.5, 5.25, 1.75, 90),
table("Grand Ballroom", "38", "Breanna Williams", 40.8, 65.1, 5.25, 1.75, 90),
table("Grand Ballroom", "39", "Alina Lane", 40.8, 72.9, 5.25, 1.75, 90),

table("Grand Ballroom", "40", "Shelby Gunter", 35.7, 78.3, 5.25, 1.75),

table("Grand Ballroom", "41", "Ginger Scott", 59.4, 72.9, 5.25, 1.75, 90),
table("Grand Ballroom", "42", "Aly Stiles", 59.4, 65.1, 5.25, 1.75, 90),
table("Grand Ballroom", "43", "Amy Cecil", 59.4, 57.5, 5.25, 1.75, 90),
table("Grand Ballroom", "44", "Miranda Lynn", 59.4, 50.0, 5.25, 1.75, 90),
table("Grand Ballroom", "45", "Emily Mayer", 59.4, 42.5, 5.25, 1.75, 90),
table("Grand Ballroom", "46", "Amy Marie", 59.4, 34.7, 5.25, 1.75, 90),
table("Grand Ballroom", "47", "Renee Harless", 59.4, 27.4, 5.25, 1.75, 90),

table("Grand Ballroom", "48", "Cassandra Featherstone", 64.3, 21.5, 5.25, 1.75),

table("Grand Ballroom", "49", "JS Mercier", 68.9, 27.4, 5.25, 1.75, 90),
table("Grand Ballroom", "50", "Kellie Storm", 68.9, 34.7, 5.25, 1.75, 90),
table("Grand Ballroom", "51", "Jodie Larson", 68.9, 42.5, 5.25, 1.75, 90),
table("Grand Ballroom", "52", "A. M. Wilson", 68.9, 50.0, 5.25, 1.75, 90),
table("Grand Ballroom", "53", "LK Farlow", 68.9, 57.5, 5.25, 1.75, 90),
table("Grand Ballroom", "54", "Claire Hastings", 68.9, 65.1, 5.25, 1.75, 90),
table("Grand Ballroom", "55", "Drea Denae", 68.9, 72.9, 5.25, 1.75, 90),

table("Grand Ballroom", "56", "Kimberly Chance", 64.3, 78.3, 5.25, 1.75),

  // =========================
  // SAGO PALM BALLROOM
  // =========================

  table("Sago Palm Ballroom", "57", "Shelly Cruz", 74.7, 75.9, 5.25, 1.75),
  table("Sago Palm Ballroom", "58", "April Moran", 57.4, 75.9, 5.25, 1.75),

  table("Sago Palm Ballroom", "59", "PJ Devere", 41.7, 75.9, 5.25, 1.75),
  table("Sago Palm Ballroom", "60", "Jennifer J Williams", 24.7, 75.9, 5.25, 1.75),

  table("Sago Palm Ballroom", "61", "Rebecca Jenshak", 7.4, 75.9, 5.25, 1.75, 45),
  table("Sago Palm Ballroom", "62", "Nicole Baker", 6.4, 48.2, 5.25, 1.75, 90),
  table("Sago Palm Ballroom", "63", "Nikki Grant", 8.0, 23.3, 5.25, 1.75, -45),

  table("Sago Palm Ballroom", "64", "Cristina Lollabrigida", 22.8, 21.8, 5.25, 1.75),
  table("Sago Palm Ballroom", "65", "Laurelin Paige", 34.1, 21.8, 5.25, 1.75),
  table("Sago Palm Ballroom", "66", "LC Taylor / Dori Pulitano", 46.6, 21.8, 5.25, 1.75),
  table("Sago Palm Ballroom", "67", "Jillian D Wray", 58.2, 21.8, 5.25, 1.75),
  table("Sago Palm Ballroom", "68", "Gail Haris", 69.2, 21.8, 5.25, 1.75),
  table("Sago Palm Ballroom", "69", "Katie Rae", 80.3, 21.8, 5.25, 1.75),

  table("Sago Palm Ballroom", "70", "JL Stray", 93.1, 23.7, 5.25, 1.75, 45),

  table("Sago Palm Ballroom", "71", "Michelle Windsor", 94.0, 48.0, 5.25, 1.75, 90),
  table("Sago Palm Ballroom", "72", "Willow Winters", 93.7, 73.5, 5.25, 1.75, -45),

  // =========================
  // PALM BALLROOM
  // =========================

  table("Palm Ballroom", "75", "Nicole Blanchard", 27.1, 82.8, 5.25, 1.75),

  table("Palm Ballroom", "76", "CA Miconi", 9.5, 79.4, 5.25, 1.75, 45),

  table("Palm Ballroom", "77", "Phoebe Alexander", 8.2, 58.3, 5.25, 1.75, 90),
  table("Palm Ballroom", "78", "Kiki Malone", 8.2, 35.0, 5.25, 1.75, 90),
  table("Palm Ballroom", "79", "Janine Infante Bosco", 8.4, 13.9, 5.25, 1.75, -45),
  table("Palm Ballroom", "80", "EC Land", 20.8, 11.4, 5.25, 1.75),
  table("Palm Ballroom", "81", "KC Savage", 35.5, 11.4, 5.25, 1.75),
  table("Palm Ballroom", "82", "LA Shaw", 55.1, 11.4, 5.25, 1.75),

  table("Palm Ballroom", "83", "Elle Parker", 73.7, 11.4, 5.25, 1.75),
  table("Palm Ballroom", "84", "Rachel Belrose", 87.1, 13.9, 5.25, 1.75, 45),
  table("Palm Ballroom", "85", "Norma Marie", 88.6, 32.8, 5.25, 1.75, 90),
  table("Palm Ballroom", "86", "Callie Meadows", 88.6, 55.8, 5.25, 1.75, 90),

  table("Palm Ballroom", "87", "Amber Allee", 87.7, 76.9, 5.25, 1.75, -45),

  table("Palm Ballroom", "88", "Jenn Bullard", 76.2, 82.8, 5.25, 1.75),
  table("Palm Ballroom", "89", "Alisha Williams", 60.6, 82.8, 5.25, 1.75),
];