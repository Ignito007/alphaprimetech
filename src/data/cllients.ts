export type Client = {
  id: string;
  name: string;
  website?: string;
  logo: string; // path under /public
};

export const clients: Client[] = [
  {
    id: "client-001",
    name: "Client Name One",
    website: "https://example.com",
    logo: "/clients/client-001.png",
  },
  {
    id: "client-002",
    name: "Client Name Two",
    website: "https://example.com",
    logo: "/clients/client-002.png",
  },
  {
    id: "client-003",
    name: "Client Name Three",
    website: "https://example.com",
    logo: "/clients/client-003.png",
  },
];
