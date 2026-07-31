export interface AdminOrder {
  id: string;
  customer: string;
  items: string;
  total: number;
  mode: "Domicilio" | "Recoger" | "En mesa";
  status: "Nuevo" | "En cocina" | "En camino" | "Entregado";
  time: string;
  channel: "Web" | "WhatsApp" | "QR";
}

export const ORDERS: AdminOrder[] = [
  { id: "#1042", customer: "Valentina O.", items: "2x Clásica, Papas trufa", total: 73700, mode: "Domicilio", status: "Nuevo", time: "hace 2 min", channel: "Web" },
  { id: "#1041", customer: "Andrés M.", items: "Smash Doble, Malteada", total: 41800, mode: "Domicilio", status: "En cocina", time: "hace 9 min", channel: "WhatsApp" },
  { id: "#1040", customer: "Laura Q.", items: "Alitas BBQ, Cerveza", total: 40800, mode: "Recoger", status: "En cocina", time: "hace 14 min", channel: "Web" },
  { id: "#1039", customer: "Mesa 6", items: "Nachos, 2x Limonada", total: 42700, mode: "En mesa", status: "En camino", time: "hace 22 min", channel: "QR" },
  { id: "#1038", customer: "Sebastián R.", items: "BBQ Bacon, Aros", total: 44800, mode: "Domicilio", status: "Entregado", time: "hace 38 min", channel: "Web" },
  { id: "#1037", customer: "Camila T.", items: "Green Garden, Jugo", total: 34800, mode: "Domicilio", status: "Entregado", time: "hace 51 min", channel: "WhatsApp" },
];

// Ventas por hora (hoy)
export const SALES_BY_HOUR = [
  { h: "11a", v: 320000 },
  { h: "12m", v: 780000 },
  { h: "1p", v: 940000 },
  { h: "2p", v: 610000 },
  { h: "3p", v: 380000 },
  { h: "4p", v: 290000 },
  { h: "5p", v: 520000 },
  { h: "6p", v: 880000 },
  { h: "7p", v: 1240000 },
  { h: "8p", v: 1060000 },
  { h: "9p", v: 640000 },
];

export interface Customer {
  name: string;
  phone: string;
  orders: number;
  spent: number;
  points: number;
  last: string;
  tag: "VIP" | "Frecuente" | "Nuevo";
  fav: string;
}

export const CUSTOMERS: Customer[] = [
  { name: "Valentina Ospina", phone: "300 214 8890", orders: 34, spent: 1189600, points: 1189, last: "hace 2 días", tag: "VIP", fav: "La Muestra Clásica" },
  { name: "Andrés Molina", phone: "311 556 2043", orders: 21, spent: 742300, points: 742, last: "hace 1 semana", tag: "Frecuente", fav: "Smash Doble" },
  { name: "Laura Quintero", phone: "320 889 1177", orders: 18, spent: 628900, points: 629, last: "hace 4 días", tag: "Frecuente", fav: "Alitas BBQ" },
  { name: "Sebastián Ruiz", phone: "301 774 3320", orders: 12, spent: 431200, points: 431, last: "hace 3 semanas", tag: "Frecuente", fav: "BBQ Bacon Ranch" },
  { name: "Camila Torres", phone: "315 220 9981", orders: 3, spent: 98700, points: 99, last: "hace 5 días", tag: "Nuevo", fav: "Green Garden" },
  { name: "Mateo Gómez", phone: "312 445 6677", orders: 1, spent: 34800, points: 35, last: "ayer", tag: "Nuevo", fav: "Pancakes de la Casa" },
];

export const CRM_STATS = {
  total: 1247,
  returning: 0.42, // 42% recompran
  avgLtv: 486000,
  birthdaysThisMonth: 14,
};

export interface Promo {
  title: string;
  code: string;
  type: string;
  status: "Activa" | "Programada" | "Pausada";
  uses: number;
  revenue: number;
}

export const PROMOS: Promo[] = [
  { title: "Bienvenida primer pedido", code: "BIENVENIDO", type: "15% de descuento", status: "Activa", uses: 312, revenue: 8940000 },
  { title: "Combo del hincha", code: "MUESTRA10", type: "10% de descuento", status: "Activa", uses: 189, revenue: 6120000 },
  { title: "Martes de alitas 2x1", code: "ALITAS2X1", type: "2x1 en alitas", status: "Activa", uses: 143, revenue: 3980000 },
  { title: "Domicilio gratis fin de semana", code: "ENVIOGRATIS", type: "Envío gratis", status: "Programada", uses: 0, revenue: 0 },
  { title: "Cumpleaños Muestra Club", code: "CUMPLE", type: "Postre gratis", status: "Pausada", uses: 67, revenue: 1210000 },
];

// Ingresos y pedidos por día (últimos 7)
export const REVENUE_7D = [
  { d: "Lun", v: 6120000, o: 178 },
  { d: "Mar", v: 5480000, o: 161 },
  { d: "Mié", v: 5920000, o: 172 },
  { d: "Jue", v: 6740000, o: 198 },
  { d: "Vie", v: 9310000, o: 268 },
  { d: "Sáb", v: 11240000, o: 321 },
  { d: "Dom", v: 8760000, o: 254 },
];

// Canales de venta (participación %)
export const CHANNELS = [
  { name: "QR en mesa", pct: 38, tone: "#ee6c2b" },
  { name: "Web (domicilio)", pct: 31, tone: "#e5b567" },
  { name: "WhatsApp", pct: 22, tone: "#86b06a" },
  { name: "Mostrador", pct: 9, tone: "#8a7663" },
];

export interface IncomingOrder {
  customer: string;
  items: string[];
  total: number;
  mode: "Domicilio" | "Recoger" | "En mesa";
  channel: "Web" | "WhatsApp" | "QR";
  prep: number; // minutos estimados
}

// Plantillas para simular pedidos entrantes en vivo
export const INCOMING_POOL: IncomingOrder[] = [
  { customer: "Mariana G.", items: ["1x La Muestra Clásica", "1x Papas a la Trufa", "1x Malteada de Oreo"], total: 61700, mode: "En mesa", channel: "QR", prep: 16 },
  { customer: "Tomás V.", items: ["2x Smash Doble", "1x Limonada de Coco"], total: 63700, mode: "Domicilio", channel: "Web", prep: 18 },
  { customer: "Daniela P.", items: ["1x Alitas Buffalo (8u)", "1x Cerveza Artesanal"], total: 40800, mode: "Recoger", channel: "WhatsApp", prep: 20 },
  { customer: "Mesa 3", items: ["1x Green Garden", "1x Nachos Cargados"], total: 48800, mode: "En mesa", channel: "QR", prep: 15 },
  { customer: "Andrés M.", items: ["1x BBQ Bacon Ranch", "1x Aros de Cebolla", "1x Jugo Natural"], total: 53700, mode: "Domicilio", channel: "Web", prep: 17 },
  { customer: "Laura Q.", items: ["3x Pancakes de la Casa", "2x Capuccino de Origen"], total: 83500, mode: "En mesa", channel: "QR", prep: 14 },
  { customer: "Sebastián R.", items: ["1x Huevos Benedictinos", "1x Avocado Toast"], total: 44800, mode: "Recoger", channel: "WhatsApp", prep: 18 },
  { customer: "Camila T.", items: ["2x La Muestra Clásica", "1x Brownie con Helado"], total: 74700, mode: "Domicilio", channel: "Web", prep: 19 },
];

export const DELIVERY_ZONES = [
  { name: "Sabaneta centro", fee: 3900, min: 25000, eta: "20–30 min", on: true },
  { name: "Envigado", fee: 5900, min: 30000, eta: "25–35 min", on: true },
  { name: "Itagüí", fee: 6900, min: 35000, eta: "30–40 min", on: true },
  { name: "La Estrella", fee: 7900, min: 40000, eta: "35–45 min", on: false },
];

export const HOURS = [
  { day: "Lunes", hours: "Cerrado", on: false },
  { day: "Martes", hours: "11:00 – 21:30", on: true },
  { day: "Miércoles", hours: "11:00 – 21:30", on: true },
  { day: "Jueves", hours: "11:00 – 21:30", on: true },
  { day: "Viernes", hours: "11:00 – 22:30", on: true },
  { day: "Sábado", hours: "11:00 – 22:30", on: true },
  { day: "Domingo", hours: "11:00 – 20:00", on: true },
];

export const PAYMENT_CFG = [
  { id: "nequi", label: "Nequi", on: true },
  { id: "daviplata", label: "Daviplata", on: true },
  { id: "bancolombia", label: "Bancolombia QR", on: true },
  { id: "pse", label: "PSE", on: true },
  { id: "tarjeta", label: "Tarjeta (Wompi / Bold)", on: true },
  { id: "efectivo", label: "Efectivo contra entrega", on: true },
];

export const TOP_PRODUCTS = [
  { name: "La Muestra Clásica", sold: 148, revenue: 4277200 },
  { name: "Smash Doble", sold: 121, revenue: 3254900 },
  { name: "Alitas BBQ (8u)", sold: 96, revenue: 2678400 },
  { name: "Papas a la Trufa", sold: 210, revenue: 3339000 },
  { name: "Malteada de Oreo", sold: 88, revenue: 1311200 },
];
