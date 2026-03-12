export type Client = {
  id: string;
  name: string;
  website?: string;
  logo: string; // path under /public
};

export const clients: Client[] = [
  {
    id: "client-001",
    name: "GSA",
    website: "https://www.gsa.gov",
    logo: "/clients/gsa.png",
  },
  {
    id: "client-002",
    name: "State of Texas",
    website: "https://comptroller.texas.gov/",
    logo: "/clients/texas.png",
  },
  {
    id: "client-003",
    name: "State of North Carolina",
    website: "https://it.nc.gov/",
    logo: "/clients/nc.png",
  },
];