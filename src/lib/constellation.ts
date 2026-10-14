/**
 * Constellation geometry module.
 * Pure mathematical functions and precomputed constants for the Ethixweb Indian city constellation.
 */

export interface Point {
  x: number;
  y: number;
}

export interface HubData {
  cx: number;
  cy: number;
  r: number;
}

export interface CityData {
  id: string;
  label: string;
  name: string;
  d: string;
  sx: number;
  sy: number;
  starD: string;
  tx: number;
  ty: number;
  anchor: "start" | "end" | "middle";
  starSize: number;
}

export const DEG2RAD = Math.PI / 180;
export const C_PROJ = Math.cos(22 * DEG2RAD);
export const K_PROJ = 26;
export const X0_PROJ = 70;
export const Y0_PROJ = 70;
export const HUB_RADIUS = 30;

/**
 * Conic projection mapping longitude and latitude to SVG user coordinates.
 */
export function project(lon: number, lat: number): Point {
  return {
    x: X0_PROJ + (lon - 72.6) * C_PROJ * K_PROJ,
    y: Y0_PROJ + (28.6 - lat) * K_PROJ,
  };
}

/**
 * Generate four-pointed star path centered at (0, 0).
 */
export function generateStarPath(size: number): string {
  const S = size;
  const s26 = S === 10 ? 2.6 : Number((0.26 * S).toFixed(1));
  return `M0 -${S}L${s26} -${s26}L${S} 0L${s26} ${s26}L0 ${S}L-${s26} ${s26}L-${S} 0L-${s26} -${s26}Z`;
}

/**
 * Quadratic Bezier sub-curve connecting the hub perimeter to the city.
 */
export function computeCurve(cityX: number, cityY: number, hubX: number, hubY: number, r: number = HUB_RADIUS): string {
  const p0 = { x: hubX, y: hubY };
  const p1 = { x: (cityX + hubX) / 2, y: (cityY + hubY) / 2 - 14 };
  const p2 = { x: cityX, y: cityY };

  function B(t: number): Point {
    const mt = 1 - t;
    return {
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    };
  }

  let t0 = 0;
  for (let t = 0; t <= 1; t += 0.001) {
    const pt = B(t);
    const dist = Math.hypot(pt.x - hubX, pt.y - hubY);
    if (dist >= r + 2) {
      t0 = t;
      break;
    }
  }

  const start = B(t0);
  const control = {
    x: (1 - t0) * p1.x + t0 * p2.x,
    y: (1 - t0) * p1.y + t0 * p2.y,
  };
  const end = p2;

  return `M${start.x.toFixed(1)} ${start.y.toFixed(1)}Q${control.x.toFixed(1)} ${control.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

/**
 * Nagpur hub (geographic centre of India).
 */
export const HUB: HubData = {
  cx: 226.45300361959994,
  cy: 263.70000000000005,
  r: 30,
};

/**
 * Ten precomputed Indian cities in the constellation network.
 * Matching the approved visual reference exactly.
 */
export const CITIES: CityData[] = [
  {
    id: "delhi",
    label: "Delhi",
    name: "DELHI",
    d: "M219.5 232.4Q199.0 140.9 178.5 70.0",
    sx: 178.5,
    sy: 70.0,
    starD: "M0 -10L2.6 -2.6L10 0L2.6 2.6L0 10L-2.6 2.6L-10 0L-2.6 -2.6Z",
    tx: 188.5,
    ty: 60.0,
    anchor: "start",
    starSize: 10,
  },
  {
    id: "jaipur",
    label: "Jaipur",
    name: "JAIPUR",
    d: "M213.0 234.5Q180.1 164.7 147.1 114.2",
    sx: 147.1,
    sy: 114.2,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 135.1,
    ty: 118.2,
    anchor: "end",
    starSize: 7.5,
  },
  {
    id: "lucknow",
    label: "Lucknow",
    name: "LUCKNOW",
    d: "M234.4 232.6Q252.3 165.4 270.1 116.8",
    sx: 270.1,
    sy: 116.8,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 282.1,
    ty: 120.8,
    anchor: "start",
    starSize: 7.5,
  },
  {
    id: "ahmedabad",
    label: "Ahmedabad",
    name: "AHMEDABAD",
    d: "M197.2 250.4Q133.6 223.8 70.0 215.6",
    sx: 70.0,
    sy: 215.6,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 70.0,
    ty: 201.6,
    anchor: "middle",
    starSize: 7.5,
  },
  {
    id: "kolkata",
    label: "Kolkata",
    name: "KOLKATA",
    d: "M257.4 255.2Q354.2 230.2 450.9 226.0",
    sx: 450.9,
    sy: 226.0,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 450.9,
    ty: 248.0,
    anchor: "middle",
    starSize: 7.5,
  },
  {
    id: "mumbai",
    label: "Mumbai",
    name: "MUMBAI",
    d: "M195.1 270.2Q136.2 284.9 77.2 317.0",
    sx: 77.2,
    sy: 317.0,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 67.2,
    ty: 321.0,
    anchor: "end",
    starSize: 7.5,
  },
  {
    id: "pune",
    label: "Pune",
    name: "PUNE",
    d: "M196.4 275.1Q148.9 295.8 101.3 332.6",
    sx: 101.3,
    sy: 332.6,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 113.3,
    ty: 348.6,
    anchor: "start",
    starSize: 7.5,
  },
  {
    id: "bhubaneswar",
    label: "Bhubaneswar",
    name: "BHUBANESWAR",
    d: "M258.6 263.6Q323.6 265.7 388.7 285.8",
    sx: 388.7,
    sy: 285.8,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 400.7,
    ty: 289.8,
    anchor: "start",
    starSize: 7.5,
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    name: "BENGALURU",
    d: "M220.5 295.2Q205.5 375.7 190.5 475.6",
    sx: 190.5,
    sy: 475.6,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 178.5,
    ty: 489.6,
    anchor: "end",
    starSize: 7.5,
  },
  {
    id: "chennai",
    label: "Chennai",
    name: "CHENNAI",
    d: "M231.4 295.3Q243.5 374.5 255.6 473.0",
    sx: 255.6,
    sy: 473.0,
    starD: "M0 -7.5L2.0 -2.0L7.5 0L2.0 2.0L0 7.5L-2.0 2.0L-7.5 0L-2.0 -2.0Z",
    tx: 267.6,
    ty: 477.0,
    anchor: "start",
    starSize: 7.5,
  },
];

export const CITY_IDS = CITIES.map((c) => c.id);
